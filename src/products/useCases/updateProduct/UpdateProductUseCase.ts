import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/error";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";
import { Product } from "../../infra/entities/Product";
import { IProductRepository } from "../../repositories/IProductRepository";

@injectable()
class UpdateProductUseCase {

    constructor(
        @inject("ProductRepository")
        private productRepository: IProductRepository
    ) { }

    async execute({ id, userId, descricao, maxEstoque, minEstoque, category_id, nome, price }: ICreateProductDTO): Promise<Product | null> {
        const product = await this.productRepository.findById(id!)

        if (product?.userId !== userId) throw new AppError("Não autorizado", 401)
        
        const updatedProduct = await this.productRepository
            .update({
                id,
                userId,
                descricao,
                maxEstoque,
                minEstoque,
                category_id,
                nome,
                price
            })

        return updatedProduct;

    }
}

export { UpdateProductUseCase }