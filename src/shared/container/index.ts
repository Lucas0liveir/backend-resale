import { container } from "tsyringe";
import { RefreshTokenRepository } from "../../accounts/infra/repositories/RefreshTokenRepository";
import { UserRepository } from "../../accounts/infra/repositories/UserRepository";
import { IRefreshTokenRepository } from "../../accounts/repositories/IRefreshTokenRepository";
import { IUserRepository } from "../../accounts/repositories/IUserRepository";
import { CategoryRepository } from "../../category/infra/repositories/CategoryRespository";
import { ICategoryRepository } from "../../category/repositories/ICategoryRepository";
import { ClientRepository } from "../../clients/infra/repositories/CategoryRespository";
import { IClientRepository } from "../../clients/repositories/IClientRepository";
import { ProductRepository } from "../../products/infra/repositories/ProductRespository";
import { IProductRepository } from "../../products/repositories/IProductRepository";
import { ResaleRepository } from "../../resale/infra/repositories/ResaleRepository";
import { IResaleRepository } from "../../resale/repositories/IResaleRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository)
container.registerSingleton<IRefreshTokenRepository>("RefreshTokenRepository", RefreshTokenRepository)
container.registerSingleton<IProductRepository>("ProductRepository", ProductRepository)
container.registerSingleton<ICategoryRepository>("CategoryRepository", CategoryRepository)
container.registerSingleton<IClientRepository>("ClientRepository", ClientRepository)
container.registerSingleton<IResaleRepository>("ResaleRepository", ResaleRepository)