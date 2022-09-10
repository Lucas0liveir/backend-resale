import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import { PrismaClient } from '@prisma/client'
import { User } from "../entities/User";

class UserRepository implements IUserRepository {

    private repository!: PrismaClient

    constructor () {
        this.repository = new PrismaClient()
    }

    async create(data: ICreateUserDTO): Promise<void> {
        const newUSer = await this.repository.user.create({
                data: {
                    email: "lucas@email.com",
                    password: "1234",
                    name: "Lucas"
                }
        }).then(async (_) => await this.repository.$disconnect())   
    }

    async findByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async findById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    
}