import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

interface IResponse {
    user: {
        id?: number;
        name: string;
        email: string;
        avatar: string | null;
    }
    token: string;
}

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response<IResponse>> {
        const { email, password } = request.body
        console.log("recebeu")
        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

        const userAuthenticated = await authenticateUserUseCase.execute({ email, password })

        return response.status(200).json(userAuthenticated)
    }
}

export { AuthenticateUserController }