import { inject, injectable } from "tsyringe";
import { User } from "../../infra/entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IUserResponse {
    id: number;
    name: string;
    email: string;
    avatar: string;
}

@injectable()
class FindUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) { }

    async execute(id: number): Promise<User | null> {
        const userAlreadyExists = await this.userRepository.findById(id)
        return userAlreadyExists
    }
}

export { FindUserUseCase }