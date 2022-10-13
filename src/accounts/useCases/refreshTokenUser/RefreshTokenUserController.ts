import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../shared/error";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";


class RefreshTokenUserController {

    async handle(request: Request, response: Response): Promise<Response<{refreshToken: string, token: string }>> {
        const { refreshToken } = request.body

        if (!refreshToken || typeof refreshToken !== "string")
            throw new AppError("Refresh Token não informado", 401)

        const refreshTokenUserUseCase = container.resolve(RefreshTokenUserUseCase)

        const tokens = await refreshTokenUserUseCase.execute(refreshToken)

        return response.status(201).json(tokens)
    }
}

export { RefreshTokenUserController }