import { createRouter } from "next-connect";
import db from "@/backend/db";
import { singleProduct,postReview,deleteReview } from "@/backend/controller/productcontroller";
import { isAuthenticateuser } from "@/backend/middleware/auth";
// import allproduct from "@/backend/utils/allproduct";
const router=createRouter()
// allproduct()
db()
router.get(singleProduct)
router.put(postReview)
router.delete(deleteReview)
export default router.handler()