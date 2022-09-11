import { inject, injectable } from "tsyringe";
import { User } from "../../infra/entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class UpdateUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) { }

    async execute(id: number, name: string): Promise<User | null> {
        const updatedUser = await this.userRepository.update(id, name)

        return updatedUser

    }
}

export { UpdateUserUseCase }