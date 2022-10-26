import { Request, Response } from "express";
import { container } from "tsyringe";
import { Client } from "../../infra/entities/Client";
import { ListClientUseCase } from "./ListClientUseCase";

class ListClientController {

    async handle(request: Request, response: Response): Promise<Response<Client[] | void>> {
        const { id: userId } = request.user

        const listClientUseCase = container.resolve(ListClientUseCase)

        const client = await listClientUseCase.execute(userId)

        return response.json(client)
    }
}

export { ListClientController }