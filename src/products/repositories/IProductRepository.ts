import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { Product } from "../infra/entities/Product";

interface IProductRepository {
    create(data: ICreateProductDTO): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    findByUserId(userId: number): Promise<Product[] | []>
    update(id: string, name: string): Promise<Product | null>;
}

export { IProductRepository }