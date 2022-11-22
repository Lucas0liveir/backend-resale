import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IUserResponse {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

@injectable()
class CreateUserSocialLoginUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) { }

    async execute({
        name,
        email,
        avatar
    }: ICreateUserDTO): Promise<IUserResponse> {

        const newUser = await this.userRepository.create({
            name,
            email,
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

export { CreateUserSocialLoginUseCase }