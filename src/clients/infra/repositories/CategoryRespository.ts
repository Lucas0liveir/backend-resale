import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../shared/error";
import { ICreateClientDTO } from "../../dtos/ICreateClientDTO";
import { IClientRepository } from "../../repositories/IClientRepository";
import { Client } from "../entities/Client";

class ClientRepository implements IClientRepository {

    private repository: PrismaClient

    constructor() {
        this.repository = new PrismaClient()
    }

    async create({ ...rest }: ICreateClientDTO): Promise<Client> {
        const client = new Client(rest)

        const newClient = this.repository.client.create({
            data: { ...client }
        }).then(client => {
            this.repository.$disconnect()
            return client
        }).catch(_ => {
            throw new AppError("Ocorreu um erro ao cadastrar cliente, favor tentar novamente")
        })

        return newClient
    }

    async findById(id: string): Promise<Client | null> {
        const client = await this.repository.client.findUnique({
            where: {
                id
            }
        })
            .then(client => {
                this.repository.$disconnect()
                return client
            })
            .then(client => { return client })
            .catch(_ => {
                throw new AppError("Ocorreu um erro ao buscar cliente, favor tentar novamente")
            })

        return client
    }

    async update(id: string, nome: string, telefone: string): Promise<Client | null> {
        const client = this.repository.client.update({
            where: {
                id
            },
            data: {
                nome,
                telefone
            }
        })
            .then(client => {
                this.repository.$disconnect()
                return client
            })
            .then(client => { return client })
            .catch(_ => {
                throw new AppError("Ocorreu um erro ao atualizar o cliente, favor tentar novamente")
            })

        return client
    }

}

export { ClientRepository }