import { createRouter } from "next-connect";
import db from "@/backend/db";
import { getSingleOrder,updateOrder,deleteOrder } from "@/backend/controller/ordercontroller";
import { adminAuthorize, isAuthenticateuser } from "@/backend/middleware/auth";
const router = createRouter();
db();
router.put(updateOrder)
router.delete(deleteOrder)
router.use(isAuthenticateuser,adminAuthorize("Retailer","Admin")).get(getSingleOrder);

export default router.handler();