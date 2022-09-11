import { Request, Response } from "express";
import { container } from "tsyringe";
import { User } from "../../infra/entities/User";
import { UpdateUserUseCase } from "./UpdateUserUseCase";


class UpdateUserController {

    async handle(request: Request, response: Response): Promise<Response<User>> {
        const { name } = request.body
        const { id } = request.user
        const updateUserUseCase = container.resolve(UpdateUserUseCase)

        const userUpdated = await updateUserUseCase.execute(id, name)

        return response.status(200).json(userUpdated)
    }
}

export { UpdateUserController }