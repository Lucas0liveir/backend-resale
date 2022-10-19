import { inject, injectable } from "tsyringe";
import { Product } from "../../infra/entities/Product";
import { IProductRepository } from "../../repositories/IProductRepository";

@injectable()
class ListProductUseCase {

    constructor(
        @inject("ProductRepository")
        private productRepository: IProductRepository
    ) { }

    async execute(userId: number): Promise<Product[] | null> {
        const products = await this.productRepository
            .findByUserId(userId)

        return products;

    }
}

export { ListProductUseCase }