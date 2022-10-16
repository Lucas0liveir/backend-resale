import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";

class Category implements ICreateCategoryDTO {

    id?: string;
    nome: string;

    constructor({ nome }: ICreateCategoryDTO) {
        this.nome = nome;
    }

}

export { Category }