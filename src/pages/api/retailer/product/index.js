import db from "@/backend/db";
import {createRouter} from 'next-connect'
import { postProduct,getRetailproduct } from "@/backend/controller/productcontroller";
import { isAuthenticateuser,adminAuthorize} from "@/backend/middleware/auth";
const router=createRouter();
// allproduct(); 
db()
router.post(postProduct)
router.use(isAuthenticateuser,adminAuthorize("Retailer","Admin")).get(getRetailproduct)
export default router.handler()