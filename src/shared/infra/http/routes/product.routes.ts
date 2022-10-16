import { Router } from "express";
import { CreateProductController } from "../../../../products/useCases/createProduct/CreateProductController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const createProductController = new CreateProductController()
const productsRoute = Router()

productsRoute.post("/product", ensureAuthenticated, createProductController.handle)

export { productsRoute }