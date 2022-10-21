import { Decimal } from "@prisma/client/runtime";
import { Product } from "../../products/infra/entities/Product";

interface ICreateResaleDTO {
    id?: string;
    data?: Date;
    client_id: string;
    userId: number;
    totalValue: Decimal;
}

export { ICreateResaleDTO }