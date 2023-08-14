import db from "@/backend/db";
import {createRouter} from 'next-connect'
import { postProduct } from "@/backend/controller/productcontroller";
// import allproduct from "@/backend/utils/allproduct";
import { adminAuthorize,isAuthenticateuser } from "@/backend/middleware/auth";
const router=createRouter();
// allproduct(); 
db()
router.post(postProduct)
export default router.handler()