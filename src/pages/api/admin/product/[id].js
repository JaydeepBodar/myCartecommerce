import { createRouter } from "next-connect";
import db from "@/backend/db";
import { singleProduct,deleteProduct,updateProduct,postProduct } from "@/backend/controller/productcontroller";
// import allproduct from "@/backend/utils/allproduct";
const router=createRouter()
// allproduct()
db()
router.get(singleProduct)
router.put(updateProduct)
router.post(postProduct)
router.delete(deleteProduct)    
export default router.handler()