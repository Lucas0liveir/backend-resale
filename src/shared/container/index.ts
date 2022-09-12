import { container } from "tsyringe";
import { RefreshTokenRepository } from "../../accounts/infra/repositories/RefreshTokenRepository";
import { UserRepository } from "../../accounts/infra/repositories/UserRepository";
import { IRefreshTokenRepository } from "../../accounts/repositories/IRefreshTokenRepository";
import { IUserRepository } from "../../accounts/repositories/IUserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository)
container.registerSingleton<IRefreshTokenRepository>("RefreshTokenRepository", RefreshTokenRepository)