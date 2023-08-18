import db from "@/backend/db";
import {createRouter} from 'next-connect'
import { postProduct,getAllproduct } from "@/backend/controller/productcontroller";
import allproduct from "@/backend/utils/allproduct";
import { adminAuthorize,isAuthenticateuser} from "@/backend/middleware/auth";
const router=createRouter();
// allproduct(); 
db()
router.post(postProduct)
router.get(getAllproduct)
export default router.handler()