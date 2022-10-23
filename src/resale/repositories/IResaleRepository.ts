import { ICreateResaleDTO } from "../dtos/ICreateResaleDTO";
import { Resale } from "../infra/entities/Resale";


interface IResaleRepository {
    create({ products, ...data }: ICreateResaleDTO): Promise<Resale>;
    findById(id: string): Promise<Resale | null>;
    findByUserId(userId: number): Promise<Resale[] | []>
    updateInstallment(installment_id: string): Promise<Resale | null>;
}

export { IResaleRepository };