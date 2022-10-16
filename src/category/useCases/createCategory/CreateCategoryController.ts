import { Request, Response } from "express";
import { container } from "tsyringe";
import { Category } from "../../infra/entities/Category";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {

    async handle(request: Request, response: Response): Promise<Response<Category | void>> {
        const { nome } = request.body
        const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

        const category = await createCategoryUseCase.execute({ nome })

        return response.json(category)
    }
}

export { CreateCategoryController }