import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../shared/error";
import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { Category } from "../entities/Category";

class CategoryRepository implements ICategoryRepository {

    private repository: PrismaClient

    constructor() {
        this.repository = new PrismaClient()
    }

    async create({ ...rest }: ICreateCategoryDTO): Promise<Category> {
        const category = new Category(rest)

        const newCategory = this.repository.category.create({
            data: { ...category }
        }).then(category => {
            this.repository.$disconnect()
            return category
        }).catch(_ => {
            throw new AppError("Ocorreu um erro ao cadastrar categoria, favor tentar novamente")
        })

        return newCategory
    }

    async findAll(): Promise<Category[] | null> {
        const categories = await this.repository.category.findMany()
            .then(res => {
                this.repository.$disconnect()
                return res
            })
            .catch(_ => {
                throw new AppError("Não foi possível listar as categorias, favor tente novamente")
            })

        return categories
    }
    
    async findById(id: string): Promise<Category | null> {
        const category = await this.repository.category.findUnique({
            where: {
                id
            }
        })
            .then(category => {
                this.repository.$disconnect()
                return category
            })
            .then(category => { return category })
            .catch(_ => {
                throw new AppError("Ocorreu um erro ao buscar categoria, favor tentar novamente")
            })

        return category
    }

    async update(id: string, nome: string): Promise<Category | null> {
        const category = this.repository.category.update({
            where: {
                id
            },
            data: {
                nome
            }
        })
            .then(category => {
                this.repository.$disconnect()
                return category
            })
            .then(category => { return category })
            .catch(_ => {
                throw new AppError("Ocorreu um erro ao atualizar a categoria, favor tentar novamente")
            })

        return category
    }

}

export { CategoryRepository }