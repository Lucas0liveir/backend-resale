import { Router } from "express";
import { AuthenticateUserController } from "../../../../accounts/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../../../../accounts/useCases/createUser/CreateUserController";
import { RefreshTokenUserController } from "../../../../accounts/useCases/refreshTokenUser/RefreshTokenUserController";

const authenticateUserController = new AuthenticateUserController()
const createUserController = new CreateUserController()
const refreshTokenUserController = new RefreshTokenUserController()
const accounts = Router()

accounts.post('/user', createUserController.handle)
accounts.post('/sessions', authenticateUserController.handle)
accounts.post('/refreshToken', refreshTokenUserController.handle)

export { accounts }