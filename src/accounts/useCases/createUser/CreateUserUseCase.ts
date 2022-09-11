import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { AppError } from "../../../shared/error";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

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
    }: ICreateUserDTO): Promise<User> {
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

        return newUser
    }
}

export { CreateUserCase }