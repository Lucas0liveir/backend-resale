import { container } from "tsyringe";
import { UserRepository } from "../../accounts/infra/repositories/UserRepository";
import { IUserRepository } from "../../accounts/repositories/IUserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository)