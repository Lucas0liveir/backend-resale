import { Router } from "express";
import { CreateProductController } from "../../../../products/useCases/createProduct/CreateProductController";
import { ListProductController } from "../../../../products/useCases/listProduct/ListProductController";
import { UpdateProductController } from "../../../../products/useCases/updateProduct/UpdateProductController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const listProductController = new ListProductController()
const createProductController = new CreateProductController()
const updateProductController = new UpdateProductController()
const productsRoute = Router()

productsRoute.get("/product", ensureAuthenticated, listProductController.handle)
productsRoute.post("/product", ensureAuthenticated, createProductController.handle)
productsRoute.put("/product/:id", ensureAuthenticated, updateProductController.handle)

export { productsRoute }