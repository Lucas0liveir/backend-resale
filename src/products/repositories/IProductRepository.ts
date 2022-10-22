import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { Product } from "../infra/entities/Product";

interface IProductRepository {
    create(data: ICreateProductDTO): Promise<Product>;
    findByIds(products_id: string[]): Promise<Product[] | []>;
    findById(products_id: string): Promise<Product | null>;
    findByUserId(userId: number): Promise<Product[] | []>
    update({ ...rest }: ICreateProductDTO): Promise<Product | null>;
}

export { IProductRepository }