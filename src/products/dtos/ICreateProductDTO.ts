import { Decimal } from "@prisma/client/runtime";

interface ICreateProductDTO {
    id?: string;
    userId: number;
    category_id: string;
    nome: string;
    descricao: string;
    markup: string;
    cost_price: Decimal;
    price: Decimal;
    estoque: number;
    minEstoque: number;
}

export { ICreateProductDTO }