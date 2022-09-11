import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/entities/User";

interface IUserRepository {
    create(data: ICreateUserDTO): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    update(id: number, name: string): Promise<User | null>;
}

export { IUserRepository }