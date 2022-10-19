import { Request, Response } from "express";
import { container } from "tsyringe";
import { Product } from "../../infra/entities/Product";
import { ListProductUseCase } from "./ListProductUseCase";


class ListProductController {

    async handle(request: Request, response: Response): Promise<Response<Product[] | null>> {
        const { id: userId } = request.user

        const listProductUseCase = container.resolve(ListProductUseCase)

        const products = await listProductUseCase.execute(userId)

        return response.json(products)

    }
}

export { ListProductController }