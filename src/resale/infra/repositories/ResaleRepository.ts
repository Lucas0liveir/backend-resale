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
        const installments_id = installments!.map(item => item.id) as string[]

        await this.repository.resale.create({
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

            }
        })
            .catch(e => {
                console.log(e)
                throw new AppError("Não foi possivel registrar a revenda, favor tentar novamente")
            })

        for await (const product of products) {
            await this.repository.product.update({
                where: {
                    id: product.product_id
                },
                data: {
                    estoque: {
                        decrement: product.quantity
                    }
                }
            })
        }

        const resale = await this.repository.resale.findMany({
            where: {
                installments: {
                    every: {
                        id: { in: [...installments_id] }
                    }
                }
            },
            include: {
                installments: true,
                cliente: true,
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
            .catch(_ => {
                throw new AppError("sua revenda foi criada, porém houve um erro ao retorna-la.")
            })

        return resale as unknown as Resale;
    }

    async findById(id: string): Promise<Resale | null> {
        const resale = await this.repository.resale.findUnique({
            where: {
                id
            },
            include: {
                installments: true,
                cliente: true,
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
            .catch(_ => {
                throw new AppError("não foi possivel buscar a revenda, favor tentar novamente mais tarde.")
            })

        return resale as unknown as Resale;
    }

    async findByUserId(userId: number): Promise<[] | Resale[]> {
        const resales = await this.repository.resale.findMany({
            where: {
                userId,
                AND: {
                    is_canceled: false
                }
            },
            include: {
                installments: true,
                cliente: true,
                products: {
                    select: {
                        product: true,
                        quantity: true
                    }
                }
            }
        })
            .then(resales => {
                this.repository.$disconnect()
                return resales
            })
            .catch(_ => {
                throw new AppError("Não foi possivel listar as revendas, favor tente novamente mais tarde.")
            })

        return resales as unknown as Resale[];
    }

    async updateInstallment(installment_id: string): Promise<Resale | null> {
        const updatedInstallment = await this.repository.installments.update({
            where: {
                id: installment_id
            },
            data: {
                is_paid: true
            },
            include: {
                resale_itens: {
                    select: {
                        id: true
                    }
                }
            }
        })
            .then(res => {
                this.repository.$disconnect()
                return res
            })
            .catch(_ => {
                throw new AppError("não foi possivel atualizar a revenda, favor tentar novamente mais tarde.")
            })

        const updatedResale = this.repository.resale.findUnique({
            where: {
                id: updatedInstallment.resale_itens_id
            },
            include: {
                installments: true,
                cliente: true,
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
            .catch(_ => {
                throw new AppError("não foi possivel buscar a revenda, favor tentar novamente mais tarde.")
            })

        return updatedResale as unknown as Resale;
    }

}

export { ResaleRepository }