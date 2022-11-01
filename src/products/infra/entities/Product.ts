import { Decimal } from "@prisma/client/runtime";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";

class Product implements ICreateProductDTO {
    
    id?: string;
    nome: string;
    userId: number;
    category_id: string;
    descricao: string;
    price: Decimal;
    markup: string;
    cost_price: Decimal;
    estoque: number;
    minEstoque: number;

    constructor({ nome, descricao, category_id, estoque, minEstoque, price, userId, markup, cost_price }: ICreateProductDTO) {
        this.nome = nome;
        this.descricao = descricao;
        this.userId = userId;
        this.category_id = category_id;
        this.price = price;
        this.cost_price = cost_price;
        this.markup = markup;
        this.estoque = estoque;
        this.minEstoque = minEstoque;
    }
   
}

export { Product }