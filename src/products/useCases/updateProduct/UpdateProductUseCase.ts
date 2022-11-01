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

    async execute({ ...rest }: ICreateProductDTO): Promise<Product | null> {
        const product = await this.productRepository.findById(rest.id!)

        if (product?.userId !== rest.userId) throw new AppError("Não autorizado", 401)
        
        const updatedProduct = await this.productRepository
            .update({
                ...rest
            })

        return updatedProduct;

    }
}

export { UpdateProductUseCase }