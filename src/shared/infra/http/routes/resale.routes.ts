import { Router } from "express";
import { CreateResaleController } from "../../../../resale/useCases/createResale/CreateResaleController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const createResaleController = new CreateResaleController()
const resaleRoute = Router()

resaleRoute.post("/resale", ensureAuthenticated, createResaleController.handle)

export { resaleRoute }