import { Router } from "express";
import { CreateClientController } from "../../../../clients/useCases/createClient/CreateClientController";
import { ListClientController } from "../../../../clients/useCases/listClient/ListClientController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const listClientController = new ListClientController()
const createClientController = new CreateClientController()
const clientRoutes = Router()

clientRoutes.get("/client", ensureAuthenticated, listClientController.handle)
clientRoutes.post("/client", ensureAuthenticated, createClientController.handle)

export { clientRoutes }