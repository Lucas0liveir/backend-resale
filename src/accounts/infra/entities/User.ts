import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

class User {
    id?: number;
    name!: string;
    email!: string;
    password!: string;
    avatar!: string | null;

    constructor({ email, name, avatar, password }: ICreateUserDTO) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.avatar = avatar ?? null
    }
}

export { User }