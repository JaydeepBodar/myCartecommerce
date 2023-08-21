import { createRouter } from "next-connect";
import db from "@/backend/db";
import { getSingleOrder,updateOrder } from "@/backend/controller/ordercontroller";
const router = createRouter();
db();
router.get(getSingleOrder);
router.put(updateOrder)
export default router.handler();