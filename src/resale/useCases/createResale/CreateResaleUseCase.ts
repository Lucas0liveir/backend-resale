import { Decimal } from "@prisma/client/runtime";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../../../products/repositories/IProductRepository";
import { AppError } from "../../../shared/error";
import { ICreateResaleDTO } from "../../dtos/ICreateResaleDTO";
import { Resale } from "../../infra/entities/Resale";
import { IResaleRepository } from "../../repositories/IResaleRepository";

@injectable()
class CreateResaleUseCase {

    constructor(
        @inject("ResaleRepository")
        private resaleRepository: IResaleRepository,
        @inject("ProductRepository")
        private productRepository: IProductRepository
    ) { }

    async execute({ products, client_id, userId }: ICreateResaleDTO, installments_date: string[]): Promise<Resale> {
        const products_id = products.map(item => {
            return item.product_id
        })

        const data_products = await this.productRepository.findByIds(products_id)

        if (data_products.length === 0) throw new AppError("id inválido")
        
        let totalValue = 0

        for (let i = 0; i < data_products!.length; i++) {
            for (let j = 0; j < products!.length; j++) {
                if (products[j].product_id === data_products![i].id) {
                    totalValue += (Number(products[j].quantity) * Number(data_products[i].price))
                    break
                }
            }
        }

        let totalValueInDecimal = new Decimal(totalValue)

        const installments = installments_date.map(item => {
            return {
                payment_date: item,
                payment_value: new Decimal(totalValue / installments_date.length)
            }
        })
        

        const resale = await this.resaleRepository.create({ products, installments, totalValue: totalValueInDecimal, client_id, userId })

        return resale
    }
}

export { CreateResaleUseCase }