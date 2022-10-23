import { Decimal } from "@prisma/client/runtime";

interface ICreateResaleDTO {
    id?: string;
    data?: Date;
    client_id: string;
    userId: number;
    totalValue?: Decimal;
    products: products_to_resale[];
    is_canceled?: boolean;
    installments?: Installments[]
}

export type Installments = {
    id?: string;
    payment_date: string;
    payment_value: Decimal;
    is_paid?: boolean;
}

type products_to_resale = {
    product_id: string;
    quantity: number;
}

export { ICreateResaleDTO }