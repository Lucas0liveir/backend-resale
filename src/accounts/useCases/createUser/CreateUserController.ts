import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { User } from "../../infra/entities/User";
import { CreateUserCase } from "./CreateUserUseCase";

class CreateUserController {

    async handle(request: Request, response: Response, next: NextFunction): Promise<Response<User> | void> {

        try {
            const { name, email, password, avatar } = request.body
            const createUserUseCase = container.resolve(CreateUserCase)

            const user = await createUserUseCase.execute({
                name, email, password, avatar
            })

            return response.status(201).json(user)

        } catch (err) {
            next(err)
        }

    }
}

export { CreateUserController }