import { Decimal } from "@prisma/client/runtime";
import { Product } from "../../../products/infra/entities/Product";
import { ICreateResaleDTO, Installments } from "../../dtos/ICreateResaleDTO";

class Resale {
    id?: string;
    data?: Date;
    client_id: string;
    userId: number;
    totalValue?: Decimal;
    is_canceled?: boolean;
    installments?: Installments[];
    products?: {
        product: Product;
        quantity: number;
    }[];

    constructor({ client_id, userId, totalValue }: ICreateResaleDTO) {
        this.client_id = client_id
        this.userId = userId
        this.totalValue = totalValue
    }
}

export { Resale }