import db from "@/backend/db";
import {createRouter} from 'next-connect'
import { newsletter} from "@/backend/controller/newslettercontroller";
const router=createRouter();
db()
router.post(newsletter)
export default router.handler()