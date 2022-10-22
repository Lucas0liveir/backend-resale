import { Decimal } from "@prisma/client/runtime";

interface ICreateResaleDTO {
    id?: string;
    data?: Date;
    client_id: string;
    userId: number;
    totalValue?: Decimal;
    products: products_to_resale[];
    installments?: Installments[]
}

type Installments = {
    payment_date: string;
    payment_value: Decimal;
}

type products_to_resale = {
    product_id: string;
    quantity: number;
}

export { ICreateResaleDTO }