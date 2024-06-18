import db from "@/backend/db";
import {createRouter} from 'next-connect'
import { Comomuseproduct} from "@/backend/controller/productcontroller";
// import allproduct from "@/backend/utils/allproduct"; 
const router=createRouter();
// allproduct(); 
db()
router.get(Comomuseproduct)
// router.post(postProduct)
export default router.handler()