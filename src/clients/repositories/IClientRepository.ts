import { ICreateClientDTO } from "../dtos/ICreateClientDTO";
import { Client } from "../infra/entities/Client";

interface IClientRepository {
    create(data: ICreateClientDTO): Promise<Client>;
    findById(id: string): Promise<Client | null>;
    update(id: string, nome: string, telefone: string): Promise<Client | null>;
}

export { IClientRepository }