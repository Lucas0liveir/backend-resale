import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserSocialLoginUseCase } from "./AuthenticateUserSocialLoginUseCase";

interface IResponse {
    user: {
        id?: number;
        name: string;
        email: string;
        avatar: string | null;
    }
    token: string;
}

class AuthenticateUserSocialLoginController {
    async handle(request: Request, response: Response): Promise<Response<IResponse>> {
        const { accessToken, socialNetwork } = request.body
        const authenticateUserSocialLoginUseCase = container.resolve(AuthenticateUserSocialLoginUseCase)

        const userAuthenticated = await authenticateUserSocialLoginUseCase.execute(accessToken, socialNetwork)

        return response.status(200).json(userAuthenticated)
    }
}

export { AuthenticateUserSocialLoginController }