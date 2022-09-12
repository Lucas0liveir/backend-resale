import { ICreateRefreshTokenDTO } from "../dtos/ICreateRefreshTokenDTO";

interface IRefreshTokenRepository {
    create(userId: number, token: string): Promise<ICreateRefreshTokenDTO | null>;
    findByUserId(userId: number): Promise<ICreateRefreshTokenDTO | null>;
    delete(userId: number): Promise<void>;
}

export { IRefreshTokenRepository }