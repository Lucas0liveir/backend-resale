import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { AppError } from "../../../shared/error";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IUserResponse {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

@injectable()
class CreateUserCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) { }

    async execute({
        name,
        email,
        password,
        avatar
    }: ICreateUserDTO): Promise<IUserResponse> {
        const userAlreadyExists = await this.userRepository.findByEmail(email)

        if (userAlreadyExists) {
            throw new AppError("Endereço de email já cadastrado");
        }

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = await this.userRepository.create({
            name,
            email,
            password: passwordHash,
            avatar
        });

        return {
            id: newUser.id!,
            name: newUser.name,
            email: newUser.email,
            avatar: newUser.avatar!
        }
    }
}

export { CreateUserCase }