import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../shared/error";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";
import { IProductRepository } from "../../repositories/IProductRepository";
import { Product } from "../entities/Product";

class ProductRepository implements IProductRepository {

    private repository: PrismaClient

    constructor() {
        this.repository = new PrismaClient()
    }

    async create({ ...rest }: ICreateProductDTO): Promise<Product> {
        const product = new Product(rest)

        const newProduct = this.repository.product.create({
            data: { ...product }
        }).then(product => {
            this.repository.$disconnect()
            return product
        }).catch(_ => {
            throw new AppError("Ocorreu um erro ao cadastrar seu produto, favor tentar novamente")
        })

        return newProduct
    }

    async findById(id: string): Promise<Product | null> {
        const product = this.repository.product.findUnique({
            where: {
                id
            }
        })
            .then(product => {
                this.repository.$disconnect()
                return product
            })
            .then(product => { return product })
            .catch(_ => {
                throw new AppError("Ocorreu um erro ao buscar seu produto, favor tentar novamente")
            })

        return product
    }

    async findByUserId(userId: number): Promise<[] | Product[]> {
        const product = this.repository.product.findMany({
            where: {
                userId
            }
        })
            .then(product => {
                this.repository.$disconnect()
                return product
            })
            .then(product => { return product })
            .catch(_ => {
                throw new AppError("Ocorreu um erro ao buscar seus produtos, favor tentar novamente")
            })

        return product
    }

    update(id: string): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }

}

export { ProductRepository }