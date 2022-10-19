import { Request, Response } from "express";
import { container } from "tsyringe";
import { Product } from "../../infra/entities/Product";
import { UpdateProductUseCase } from "./UpdateProductUseCase";


class UpdateProductController {

    async handle(request: Request, response: Response): Promise<Response<Product | null>> {
        const { id } = request.query as unknown as { [key: string]: string }
        
        const { nome, descricao, price, minEstoque, maxEstoque, category_id } = request.body
        const { id: userId } = request.user

        const updateProductUseCase = container.resolve(UpdateProductUseCase)

        const updatedProduct = await updateProductUseCase
            .execute({ id, userId, nome, descricao, price, minEstoque, maxEstoque, category_id })

        return response.json(updatedProduct)
    }
}

export { UpdateProductController }