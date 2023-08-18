import { createRouter } from "next-connect";
import db from "@/backend/db";
import { singleProduct,deleteProduct,updateProduct } from "@/backend/controller/productcontroller";
// import allproduct from "@/backend/utils/allproduct";
const router=createRouter()
// allproduct()
db()
router.get(singleProduct)
router.put(updateProduct)
router.delete(deleteProduct)    
export default router.handler()