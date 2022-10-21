import { ICreateResaleDTO } from "../dtos/ICreateResaleDTO";
import { Resale } from "../infra/entities/Resale";

interface IResaleRepository {
    create(data: ICreateResaleDTO, products: { product_id: string, quantity: number }[]): Promise<Resale>;
    findById(id: string): Promise<Resale | null>;
    findByUserId(userId: number): Promise<Resale[] | []>
    update(data: ICreateResaleDTO): Promise<Resale | null>;
}

export { IResaleRepository };