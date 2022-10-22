import { Router } from "express";
import { accounts } from "./account.routes";
import { categoryRoute } from "./category.routes";
import { clientRoutes } from "./client.routes";
import { productsRoute } from "./product.routes";
import { resaleRoute } from "./resale.routes";

const router = Router()

router.use("/admin", categoryRoute)
router.use("/accounts", accounts)
router.use("/accounts", productsRoute)
router.use("/accounts", resaleRoute)
router.use("/accounts", clientRoutes)

export { router }