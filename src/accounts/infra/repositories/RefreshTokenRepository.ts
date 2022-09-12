import { PrismaClient } from "@prisma/client";
import { ICreateRefreshTokenDTO } from "../../dtos/ICreateRefreshTokenDTO";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";


class RefreshTokenRepository implements IRefreshTokenRepository {

    private repository: PrismaClient;

    constructor() {
        this.repository = new PrismaClient()
    }

    async create(userId: number, token: string): Promise<ICreateRefreshTokenDTO | null> {
        const refreshToken = await this.repository.refreshToken.create({
            data: {
                userId,
                token
            }
        }).then(async (refreshToken) => {
            await this.repository.$disconnect()
            return refreshToken
        })

        return refreshToken
    }

    async findByUserId(userId: number): Promise<ICreateRefreshTokenDTO | null> {
        const refreshToken = await this.repository.refreshToken.findUnique({
            where: {
                userId
            }
        }).then(async (refreshToken) => {
            await this.repository.$disconnect()
            return refreshToken
        })

        return refreshToken
    }

    async delete(userId: number): Promise<void> {
        await this.repository.refreshToken.delete({
            where: {
                userId
            }
        }).then(async (_) => {
            await this.repository.$disconnect()
        })
    }

}

export { RefreshTokenRepository }