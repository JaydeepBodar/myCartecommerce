import db from "@/backend/db";
import {createRouter} from 'next-connect'
import { testMonalis} from "@/backend/controller/productcontroller";
const router=createRouter();
db()
router.get(testMonalis)
export default router.handler()