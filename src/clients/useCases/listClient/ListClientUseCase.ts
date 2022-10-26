import { inject, injectable } from "tsyringe";
import { ICreateClientDTO } from "../../dtos/ICreateClientDTO";
import { Client } from "../../infra/entities/Client";
import { IClientRepository } from "../../repositories/IClientRepository";

@injectable()
class ListClientUseCase {

    constructor(
        @inject("ClientRepository")
        private clientRespository: IClientRepository
    ) { }

    async execute(userId: number): Promise<Client[] | null> {
        const clients = await this.clientRespository.findByUserId(userId)

        return clients
    }

}

export { ListClientUseCase }