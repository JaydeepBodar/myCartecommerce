import { createRouter } from "next-connect";
import db from "@/backend/db";
import { getallOrder } from "@/backend/controller/ordercontroller";
const router = createRouter();
db();
router.get(getallOrder);
export default router.handler();