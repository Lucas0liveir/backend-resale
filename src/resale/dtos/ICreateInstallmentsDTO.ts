import { Decimal } from "@prisma/client/runtime";

interface ICreateInstallmentsDTO {
    id?: string;
    payment_date: Date;
    payment_value: Decimal;
}

export { ICreateInstallmentsDTO };