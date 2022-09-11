import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken"
import { AppError } from "../../../shared/error";
import { IUserRepository } from "../../repositories/IUserRepository";

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
    }
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new AppError("Email ou senha incorretos")
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) {
            throw new AppError("Email ou senha incorretos")
        }

        const token = sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: '1h'
        })

        const userAuthenticated: IResponse = {
            user: {
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                id: user.id
            },
            token
        }

        return userAuthenticated;
    }
}

export { AuthenticateUserUseCase }