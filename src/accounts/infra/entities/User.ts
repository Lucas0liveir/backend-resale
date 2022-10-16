import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

enum Role {
    USER,
    ADMIN
}

class User {
    id?: number;
    name!: string;
    email!: string;
    password!: string;
    avatar!: string | null;
    role?: "USER" | "ADMIN"

        constructor({ email, name, avatar, password }: ICreateUserDTO) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.avatar = avatar ?? null;
}
}

export { User }