import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import { PrismaClient } from '@prisma/client'
import { User } from "../entities/User";

class UserRepository implements IUserRepository {

    private repository!: PrismaClient

    constructor() {
        this.repository = new PrismaClient()
    }

    async create({ name, email, password, avatar }: ICreateUserDTO): Promise<User> {
        const user = new User({ name, email, password, avatar })
        const newUser = await this.repository.user.create({
            data: {
                email: user.email,
                password: user.password,
                name: user.name,
                avatar: user.avatar ?? null
            }
        }).then(async (user) => {
            await this.repository.$disconnect()
            return user
        })

        return newUser

    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.repository.user.findUnique({
            where: { email }
        }).then(async (user) => {
            await this.repository.$disconnect()
            return user
        })

        return user
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.repository.user.findUnique({
            where: { id }
        }).then(async (user) => {
            await this.repository.$disconnect()
            return user
        })

        return user
    }

    async update(id: number, name: string): Promise<User | null> {
        const user = await this.repository.user.update({
            where: {
                id
            },
            data: {
                name
            }
        }).then(async (user) => {
            await this.repository.$disconnect()
            return user
        })

        return user
    }

}

export { UserRepository }