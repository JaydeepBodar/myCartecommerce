import db from "@/backend/db";
import {createRouter} from 'next-connect'
import { getAllproductdata} from "@/backend/controller/productcontroller";
// import allproduct from "@/backend/utils/allproduct"; 
const router=createRouter();
// allproduct(); 
db()
router.get(getAllproductdata)
// router.post(postProduct)
export default router.handler()