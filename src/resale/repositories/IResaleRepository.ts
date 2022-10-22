import { ICreateResaleDTO } from "../dtos/ICreateResaleDTO";
import { Resale } from "../infra/entities/Resale";


interface IResaleRepository {
    create({ products, ...data }: ICreateResaleDTO): Promise<Resale>;
    findById(id: string): Promise<Resale | null>;
    findByUserId(userId: number): Promise<Resale[] | []>
    update(data: ICreateResaleDTO): Promise<Resale | null>;
}

export { IResaleRepository };