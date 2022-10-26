import { inject, injectable } from "tsyringe";
import { Category } from "../../infra/entities/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

@injectable()
class ListCategoryUseCase {

    constructor(
        @inject("CategoryRepository")
        private categoryRespository: ICategoryRepository
    ) { }

    async execute(): Promise<Category[] | null> {
        const categories = await this.categoryRespository.findAll()

        return categories
    }

}

export { ListCategoryUseCase }