import { Request, Response } from "express";
import { container } from "tsyringe";
import { Resale } from "../../infra/entities/Resale";
import { ListResaleUseCase } from "./ListResaleUseCase";


class ListResaleController {

    async handle(request: Request, response: Response): Promise<Response<Resale[]>> {

        const { id: userId } = request.user

        const listResaleUseCase = container.resolve(ListResaleUseCase)

        const resales = await listResaleUseCase.execute(userId)

        return response.json(resales)
    }
}

export { ListResaleController }