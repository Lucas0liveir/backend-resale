import { Router } from "express";
import { accounts } from "./account.routes";
import { categoryRoute } from "./category.routes";
import { productsRoute } from "./product.routes";

const router = Router()

router.use("/admin", categoryRoute)
router.use("/accounts", accounts)
router.use("/accounts", productsRoute)

export { router }