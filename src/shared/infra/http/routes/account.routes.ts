import { Router } from "express";
import { AuthenticateUserController } from "../../../../accounts/useCases/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "../../../../accounts/useCases/createUser/CreateUserController";
import { RefreshTokenUserController } from "../../../../accounts/useCases/refreshTokenUser/RefreshTokenUserController";

const authenticateUserController = new AuthenticateUserController()
const createUserController = new CreateUserController()
const refreshTokenUserController = new RefreshTokenUserController()
const router = Router()

router.post('/user', createUserController.handle)
router.post('/sessions', authenticateUserController.handle)
router.post('/refreshToken', refreshTokenUserController.handle)

export { router }