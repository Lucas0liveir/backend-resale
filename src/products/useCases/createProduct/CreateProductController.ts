import { Decimal } from "@prisma/client/runtime";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { Product } from "../../infra/entities/Product";
import { CreateProductUseCase } from "./CreateProductUseCase";

class CreateProductController {

    async handle(request: Request, response: Response): Promise<Response<Product | void>> {
        const { id: userId } = request.user
        const { nome, descricao, category_id, price, estoque, minEstoque, markup, cost_price } = request.body
        const createProductUseCase = container.resolve(CreateProductUseCase)

        const product = await createProductUseCase
            .execute(
                {
                    userId,
                    nome,
                    descricao,
                    category_id,
                    markup, 
                    cost_price: new Decimal(cost_price),
                    price: new Decimal(price),
                    estoque,
                    minEstoque
                })

        return response.json(product)
    }
}

export { CreateProductController }