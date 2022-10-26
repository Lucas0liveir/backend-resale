import { Request, Response } from "express";
import { container } from "tsyringe";
import { Category } from "../../infra/entities/Category";
import { ListCategoryUseCase } from "./ListCategoryUseCase";

class ListCategoryController {

    async handle(request: Request, response: Response): Promise<Response<Category[] | void>> {
        const listCategoryUseCase = container.resolve(ListCategoryUseCase)

        const categories = await listCategoryUseCase.execute()

        return response.json(categories)
    }
}

export { ListCategoryController }