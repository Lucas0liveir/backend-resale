import { Router } from "express";
import { CreateClientController } from "../../../../clients/useCases/createClient/CreateClientController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const createClientController = new CreateClientController()
const clientRoutes = Router()

clientRoutes.post("/client", ensureAuthenticated, createClientController.handle)

export { clientRoutes }