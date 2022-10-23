import { Request, Response } from "express";
import { container } from "tsyringe";
import { Resale } from "../../infra/entities/Resale";
import { UpdateResaleInstallmentUseCase } from "./UpdateResaleInstallmentUseCase";


class UpdateResaleInstallmentController {

    async handle(request: Request, response: Response): Promise<Response<Resale | null>> {
        const { id: userId } = request.user

        const { installment_id, resale_id } = request.params as { installment_id: string, resale_id: string }

        const updateResaleInstallmentUseCase = container.resolve(UpdateResaleInstallmentUseCase)

        const resales = await updateResaleInstallmentUseCase.execute(installment_id, resale_id, userId)

        return response.json(resales)
    }
}

export { UpdateResaleInstallmentController }