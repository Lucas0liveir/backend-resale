import { Router } from "express";
import { CreateResaleController } from "../../../../resale/useCases/createResale/CreateResaleController";
import { ListResaleController } from "../../../../resale/useCases/listResale/ListResaleController";
import { UpdateResaleInstallmentController } from "../../../../resale/useCases/updateResaleInstallment/UpdateResaleInstallmentController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const createResaleController = new CreateResaleController()
const listResaleController = new ListResaleController()
const updateResaleInstallmentController = new UpdateResaleInstallmentController()
const resaleRoute = Router()


resaleRoute.get("/resale", ensureAuthenticated, listResaleController.handle)
resaleRoute.patch("/resale/installments/:installment_id/:resale_id", ensureAuthenticated, updateResaleInstallmentController.handle)
resaleRoute.post("/resale", ensureAuthenticated, createResaleController.handle)


export { resaleRoute }