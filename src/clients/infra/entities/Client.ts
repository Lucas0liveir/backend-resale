import { ICreateClientDTO } from "../../dtos/ICreateClientDTO";

class Client implements ICreateClientDTO {

    id?: string;
    nome: string;
    telefone: string;
    userId: number;

    constructor({ nome, telefone, userId }: ICreateClientDTO) {
        this.nome = nome;
        this.telefone = telefone;
        this.userId = userId;
    }

}

export { Client }