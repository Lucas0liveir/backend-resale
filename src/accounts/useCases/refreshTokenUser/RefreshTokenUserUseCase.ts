import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/error";
import { IRefreshTokenRepository } from "../../repositories/IRefreshTokenRepository";

@injectable()
class RefreshTokenUserUseCase {

    constructor(
        @inject("RefreshTokenRepository")
        private refreshTokenRepository: IRefreshTokenRepository
    ) { }

    async execute(token: string): Promise<{refreshToken: string, token: string}> {

        const decode = verify(token, process.env.JWT_SECRET_REFRESH_TOKEN!)

        const { sub: userId } = decode

        const user_id = Number(userId)

        if (!user_id) throw new AppError("RefreshToken is missing")

        const userRefreshToken = await this.refreshTokenRepository.findByUserId(user_id)

        if (!userRefreshToken) throw new AppError("Não existe refreshToken para este usuário")

        await this.refreshTokenRepository.delete(user_id)

        const refreshToken = sign({}, process.env.JWT_SECRET_REFRESH_TOKEN!, {
            subject: String(user_id),
            expiresIn: "7 days"
        })

        const newToken = sign({}, process.env.JWT_SECRET!, {
            subject: String(user_id),
            expiresIn: '1h'
        })

        await this.refreshTokenRepository.create(user_id, refreshToken)

        return {
            refreshToken,
            token: newToken
        };

    }
}

export { RefreshTokenUserUseCase }