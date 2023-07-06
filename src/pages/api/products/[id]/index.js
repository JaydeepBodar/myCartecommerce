import { createRouter } from "next-connect";
import db from "@/backend/db";
import { singleProduct } from "@/backend/controller/productcontroller";
const router=createRouter()
db()
router.get(singleProduct)
export default router.handler()