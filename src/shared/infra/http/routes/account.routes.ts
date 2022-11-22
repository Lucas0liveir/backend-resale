import { Router } from "express";
import { AuthenticateUserController } from "../../../../accounts/useCases/authenticateUser/AuthenticateUserController";
import { AuthenticateUserSocialLoginController } from "../../../../accounts/useCases/authenticateUserSocialLogin/AuthenticateUserSocialLoginController";
import { CreateUserController } from "../../../../accounts/useCases/createUser/CreateUserController";
import { RefreshTokenUserController } from "../../../../accounts/useCases/refreshTokenUser/RefreshTokenUserController";

const authenticateUserController = new AuthenticateUserController()
const authenticateUserSocialLoginController = new AuthenticateUserSocialLoginController()
const createUserController = new CreateUserController()
const refreshTokenUserController = new RefreshTokenUserController()
const accounts = Router()

accounts.post('/user', createUserController.handle)
accounts.post('/sessions', authenticateUserController.handle)
accounts.post('/social/sessions', authenticateUserSocialLoginController.handle)
accounts.post('/refreshToken', refreshTokenUserController.handle)

export { accounts }