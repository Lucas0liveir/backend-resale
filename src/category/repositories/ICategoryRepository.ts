import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../infra/entities/Category";

interface ICategoryRepository {
    create(data: ICreateCategoryDTO): Promise<Category>;
    findById(id: string): Promise<Category | null>;
    update(id: string, nome: string): Promise<Category | null>;
}

export { ICategoryRepository }