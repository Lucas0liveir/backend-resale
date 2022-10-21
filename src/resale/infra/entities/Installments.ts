import { Decimal } from "@prisma/client/runtime";
import { ICreateInstallmentsDTO } from "../../dtos/ICreateInstallmentsDTO";

class Installments {
    id?: string;
    payment_date: Date;
    payment_value: Decimal;

    constructor({ payment_date, payment_value }: ICreateInstallmentsDTO) {
        this.payment_date = payment_date
        this.payment_value = payment_value
    }
}

export { Installments }