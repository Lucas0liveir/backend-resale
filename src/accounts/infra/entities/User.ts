import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";


class User {
    id?: string;
    name!: string;
    email!: string;
    password!: string;
    avatar?: string

    constructor({ email, name, avatar, password }: ICreateUserDTO) {
        Object.assign(this, email, name, avatar ?? null, password)
    }
}

export { User }