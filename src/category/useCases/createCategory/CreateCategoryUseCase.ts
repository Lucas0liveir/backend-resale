import { inject, injectable } from "tsyringe";
import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { Category } from "../../infra/entities/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

@injectable()
class CreateCategoryUseCase {

    constructor(
        @inject("CategoryRepository")
        private categoryRepository: ICategoryRepository
    ) { }

    async execute({ ...rest }: ICreateCategoryDTO): Promise<Category | void> {
        const category = await this.categoryRepository.create({ ...rest })

        return category
    }

}

export { CreateCategoryUseCase }