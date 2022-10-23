import { inject, injectable } from "tsyringe";
import { Resale } from "../../infra/entities/Resale";
import { IResaleRepository } from "../../repositories/IResaleRepository";


@injectable()
class ListResaleUseCase {

    constructor(
        @inject("ResaleRepository")
        private resaleRepository: IResaleRepository
    ) { }

    async execute(userId: number): Promise<Resale[]> {
        const resales = await this.resaleRepository.findByUserId(userId)
        
        return resales
    }
}

export { ListResaleUseCase }