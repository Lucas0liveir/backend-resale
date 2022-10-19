import { Decimal } from "@prisma/client/runtime";

interface ICreateProductDTO {
    id?: string;
    userId: number;
    category_id: string;
    nome: string;
    descricao: string;
    price: Decimal;
    maxEstoque: number;
    minEstoque: number;
}

export { ICreateProductDTO }