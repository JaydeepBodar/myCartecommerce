import db from "@/backend/db";
import { createRouter } from "next-connect";
import { webhook } from "@/backend/controller/ordercontroller";
const router = createRouter();
db();
export const config={
    api:{
        bodyParser:false 
    }
}
router.post(webhook);
export default router.handler();