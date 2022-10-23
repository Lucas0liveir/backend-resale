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
            this.repository.$disconnect()
            throw new AppError("Ocorreu um erro ao cadastrar seu produto, favor tentar novamente")
        })

        return newProduct
    }

    async findByIds(id: string[]): Promise<Product[] | []> {
        const product = this.repository.product.findMany({
            where: {
                id: { in: [...id] }
            }
        })
            .then(product => {
                this.repository.$disconnect()
                return product
            })
            .then(product => { return product })
            .catch(_ => {
                this.repository.$disconnect()
                throw new AppError("Ocorreu um erro ao buscar seu produto, favor tentar novamente")
            })

        return product
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
                this.repository.$disconnect()
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
                this.repository.$disconnect()
                throw new AppError("Ocorreu um erro ao buscar seus produtos, favor tentar novamente")
            })

        return product
    }

    async update({ id, nome, descricao, estoque, minEstoque, price, category_id }: ICreateProductDTO): Promise<Product | null> {

        const updatedProduct = this.repository.product.update({
            where: {
                id
            },
            data: {
                nome,
                descricao,
                category_id,
                estoque,
                minEstoque,
                price
            }
        })
            .then(res => {
                this.repository.$disconnect()
                return res
            })
            .catch(_ => {
                throw new AppError("Ocorreu um erro ao atualizar o produto, favor tentar novamente")
            })

        return updatedProduct
    }

}

export { ProductRepository }