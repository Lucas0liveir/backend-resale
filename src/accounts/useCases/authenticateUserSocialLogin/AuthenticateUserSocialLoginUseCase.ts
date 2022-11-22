import axios from "axios";
import { container, inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../shared/error";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";
import { CreateUserSocialLoginUseCase } from "../createUserSocialLogin/CreateUserSocialLoginUseCase";

const OAUTH_URL = {
    google: process.env.GOOGLE_OAUTH_URL,
    apple: ''
}

interface IResponse {
    user: {
        id?: number;
        name: string;
        email: string;
        avatar: string | null;
        role: "USER" | "ADMIN" | undefined
    }
    token: string;
    refreshToken: string;
}

@injectable()
class AuthenticateUserSocialLoginUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("RefreshTokenRepository")
        private refreshTokenRepository: IRefreshTokenRepository
    ) { }

    async execute(accessToken: string, socialNetwork: 'google' | 'apple'): Promise<IResponse> {
        try {

            // Obtém os dados do usuário Oauth de acordo com a rede social escolhida
            /* O accessToken é o código retornado pela api oauth da rede social, todos os parâmetros
               deste serviço vem do frontend.*/
            const { data } = await axios.get(`${OAUTH_URL[socialNetwork]}${accessToken}`)
            let user = await this.userRepository.findByEmail(data.email)

            console.log(data);
            
            if (!user) {
                const createUserSocialLoginUseCase = container.resolve(CreateUserSocialLoginUseCase)
                user =  await createUserSocialLoginUseCase.execute({
                    email: data.email,
                    avatar: data.picture,
                    name: data.name
                })
            }

            const userRefreshToken = await this.refreshTokenRepository.findByUserId(user!.id!)

            if (userRefreshToken) {
                await this.refreshTokenRepository.delete(user!.id!)
            }

            const token = sign({ email: user.email }, process.env.JWT_SECRET!, {
                subject: String(user.id),
                expiresIn: '1h'
            })

            const refreshToken = sign({ email: user.email }, process.env.JWT_SECRET_REFRESH_TOKEN!, {
                subject: String(user.id),
                expiresIn: '7 days'
            })

            await this.refreshTokenRepository.create(user.id!, refreshToken)

            const userAuthenticated: IResponse = {
                user: {
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                    id: user.id,
                    role: user.role
                },
                token,
                refreshToken
            }

            return userAuthenticated;
        } catch (error) {
            console.log(error);
            
            throw new AppError(`Ocorreu um erro ${error}`)
        }
    }
}

export { AuthenticateUserSocialLoginUseCase }