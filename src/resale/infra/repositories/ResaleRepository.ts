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

    async create({ products, installments, totalValue, ...rest }: ICreateResaleDTO): Promise<Resale> {
        const resale = this.repository.resale.create({
            data: {
                totalValue: totalValue!,
                ...rest,
                products: {
                    create: [
                        ...products
                    ]
                },
                installments: {
                    create: [
                        ...installments!
                    ]
                },
            },
            include: {
                installments: true,
                products: {
                    select: {
                        product: true,
                        quantity: true
                    }
                }
            }
        })
            .then(res => {
                this.repository.$disconnect()
                return res
            })
            .catch(e => {
                console.log(e)
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

export { ResaleRepository }