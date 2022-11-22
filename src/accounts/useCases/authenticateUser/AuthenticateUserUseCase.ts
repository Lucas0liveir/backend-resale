import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../shared/error";
import { IUserRepository } from "../../repositories/IUserRepository";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";

interface IRequest {
    email: string;
    password: string;
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
class AuthenticateUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,
        @inject("RefreshTokenRepository")
        private refreshTokenRepository: IRefreshTokenRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new AppError("E-mail ou senha incorretos")
        }

        const passwordMatch = await bcrypt.compare(password, user.password!)

        if (!passwordMatch) {
            throw new AppError("E-mail ou senha incorretos")
        }

        const userRefreshToken = await this.refreshTokenRepository.findByUserId(user.id!)

        if (userRefreshToken) {
            await this.refreshTokenRepository.delete(user.id!)
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
    }
}

export { AuthenticateUserUseCase }