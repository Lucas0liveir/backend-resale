import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";
import { PrismaClient } from '@prisma/client'
import { User } from "../entities/User";
import { AppError } from "../../../shared/error";

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
        .catch(_ => {
            throw new AppError("Ocorreu um erro ao criar seu usuário, favor tentar novamente")
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
        .catch(e => {
            console.log(e)
            throw new AppError("Ocorreu um erro ao buscar usuário, favor tentar novamente")
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
        .catch(_ => {
            throw new AppError("Ocorreu um erro ao criar usuário, favor tentar novamente")
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
        .catch(_ => {
            throw new AppError("Ocorreu um erro ao atualizar seu usuário, favor tentar novamente")
        })

        return user
    }

}

export { UserRepository }