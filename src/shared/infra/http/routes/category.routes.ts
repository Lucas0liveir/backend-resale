import { Router } from "express";
import { CreateCategoryController } from "../../../../category/useCases/createCategory/CreateCategoryController";
import { ListCategoryController } from "../../../../category/useCases/listCategory/ListCategoryController";
import ensureAdmin from "../middlewares/ensureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";


const listCategoryController = new ListCategoryController()
const createCategoryController = new CreateCategoryController()
const categoryRoute = Router()

categoryRoute.get("/category", ensureAuthenticated, listCategoryController.handle)
categoryRoute.post("/category", ensureAdmin, createCategoryController.handle)

export { categoryRoute }