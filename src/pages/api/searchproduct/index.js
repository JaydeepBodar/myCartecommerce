import db from "@/backend/db";
import {createRouter} from 'next-connect'
import { searchProduct} from "@/backend/controller/productcontroller";
const router=createRouter();
db()
router.get(searchProduct)
export default router.handler()