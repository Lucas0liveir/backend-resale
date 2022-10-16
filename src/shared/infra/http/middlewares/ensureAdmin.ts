import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";
import { FindUserUseCase } from "../../../../accounts/useCases/findUser/FindUserUseCase";
import { AppError } from "../../../error";

interface IPayload {
    sub: string;
}

export default async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization

    if (!authHeader) throw new AppError("Token de autenticação necessário", 401)

    const [, token] = authHeader.split(" ")
    try {
        const { sub: userId } = verify(token, process.env.JWT_SECRET!) as unknown as IPayload

        const findUserUseCase = container.resolve(FindUserUseCase)

        const user = await findUserUseCase.execute(Number(userId))

        if (user?.role !== "ADMIN") throw new AppError("Não autorizado", 401)

        request.user = {
            id: Number(user.id!)
        }

        next()
    } catch (e) {
        if (e instanceof AppError) return response.json(e)
        throw new AppError("Token inválido", 401)
    }

}