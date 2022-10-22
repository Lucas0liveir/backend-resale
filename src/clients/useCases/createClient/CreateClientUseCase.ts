import { inject, injectable } from "tsyringe";
import { ICreateClientDTO } from "../../dtos/ICreateClientDTO";
import { Client } from "../../infra/entities/Client";
import { IClientRepository } from "../../repositories/IClientRepository";

@injectable()
class CreateClientUseCase {

    constructor(
        @inject("ClientRepository")
        private clientRespository: IClientRepository
    ) { }

    async execute({ ...rest }: ICreateClientDTO): Promise<Client | void> {
        const client = await this.clientRespository.create({ ...rest })

        return client
    }

}

export { CreateClientUseCase }