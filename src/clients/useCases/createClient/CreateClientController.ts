import { Request, Response } from "express";
import { container } from "tsyringe";
import { Client } from "../../infra/entities/Client";
import { CreateClientUseCase } from "./CreateClientUseCase";

class CreateClientController {

    async handle(request: Request, response: Response): Promise<Response<Client | void>> {
        const { id: userId } = request.user

        const { nome, telefone } = request.body
        const createClientUseCase = container.resolve(CreateClientUseCase)

        const client = await createClientUseCase.execute({userId, nome, telefone})

        return response.json(client)
    }
}

export { CreateClientController }