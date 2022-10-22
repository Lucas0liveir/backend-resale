import { Request, Response } from "express";
import { container } from "tsyringe";
import { Resale } from "../../infra/entities/Resale";
import { CreateResaleUseCase } from "./CreateResaleUseCase";


class CreateResaleController {

    async handle(request: Request, response: Response): Promise<Response<Resale>> {
        const { id: userId } = request.user
        const {
            client_id,
            products,
            installments_data
        } = request.body

        const createResaleUseCase = container.resolve(CreateResaleUseCase)

        const resale = await createResaleUseCase.execute({
            client_id,
            userId,
            products
        }, installments_data)

        return response.json(resale)
    }
}

export { CreateResaleController }