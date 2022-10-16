import { inject, injectable } from "tsyringe";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";
import { Product } from "../../infra/entities/Product";
import { IProductRepository } from "../../repositories/IProductRepository";

@injectable()
class CreateProductUseCase {

    constructor(
        @inject("ProductRepository")
        private productRepository: IProductRepository
    ) { }

    async execute({ userId, ...rest }: ICreateProductDTO): Promise<Product | void> {
        const product = await this.productRepository.create({ userId, ...rest })

        return product
    }

}

export { CreateProductUseCase }