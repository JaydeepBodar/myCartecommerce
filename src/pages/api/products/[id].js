import { createRouter } from "next-connect";
import db from "@/backend/db";
import { singleProduct } from "@/backend/controller/productcontroller";
// import allproduct from "@/backend/utils/allproduct";
const router=createRouter()
// allproduct()
db()
router.get(singleProduct)
export default router.handler()