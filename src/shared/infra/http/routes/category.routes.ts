import { Router } from "express";
import { CreateCategoryController } from "../../../../category/useCases/createCategory/CreateCategoryController";
import ensureAdmin from "../middlewares/ensureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const createCategoryController = new CreateCategoryController()
const categoryRoute = Router()

categoryRoute.post("/category", ensureAdmin, createCategoryController.handle)

export { categoryRoute }