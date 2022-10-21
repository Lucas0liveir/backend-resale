import { PrismaClient } from "@prisma/client";
import { Product } from "../../../products/infra/entities/Product";
import { AppError } from "../../../shared/error";
import { ICreateResaleDTO } from "../../dtos/ICreateResaleDTO";
import { IResaleRepository } from "../../repositories/IResaleRepository";
import { Resale } from "../entities/Resale";


class ResaleRepository implements IResaleRepository {
    private repository: PrismaClient

    constructor() {
        this.repository = new PrismaClient()
    }

    async create(data: ICreateResaleDTO, products: { product_id: string, quantity: number }[]): Promise<Resale> {
        const resale = this.repository.resale.create({
            data: {
                ...data,
                products: {
                    create: [
                        ...products
                    ]
                }
            }
        })
            .then(res => {
                this.repository.$disconnect()
                return res
            })
            .catch(_ => {
                throw new AppError("Não foi possivel registrar a revenda, favor tentar novamente")
            })

        return resale
    }

    findById(id: string): Promise<Resale | null> {
        throw new Error("Method not implemented.");
    }
    findByUserId(userId: number): Promise<[] | Resale[]> {
        throw new Error("Method not implemented.");
    }
    update(data: ICreateResaleDTO): Promise<Resale | null> {
        throw new Error("Method not implemented.");
    }

}