import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/error";
import { Resale } from "../../infra/entities/Resale";
import { IResaleRepository } from "../../repositories/IResaleRepository";


@injectable()
class UpdateResaleInstallmentUseCase {

    constructor(
        @inject("ResaleRepository")
        private resaleRepository: IResaleRepository
    ) { }

    async execute(installment_id: string, resale_id: string, userId: number): Promise<Resale | null> {
        const resale = await this.resaleRepository.findById(resale_id)

        if (resale?.userId !== userId) throw new AppError("Não autorizado", 401)
        let isInstalments_match = false

        for (let i = 0; i < resale!.installments!.length; i++) {
            if (resale!.installments![i].id === installment_id) {
                isInstalments_match = true
                break;
            }
        }

        if (!isInstalments_match) throw new AppError("Não autorizado", 401)

        const updatedResale = await this.resaleRepository.updateInstallment(installment_id)

        return updatedResale;

    }
}

export { UpdateResaleInstallmentUseCase }