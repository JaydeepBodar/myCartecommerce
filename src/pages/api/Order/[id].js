import { createRouter } from "next-connect";
import db from "@/backend/db";
import { getSingleOrder,updateOrder } from "@/backend/controller/ordercontroller";
import { adminAuthorize, isAuthenticateuser } from "@/backend/middleware/auth";
const router = createRouter();
db();
router.put(updateOrder)
router.use(isAuthenticateuser,adminAuthorize("Admin")).get(getSingleOrder);
export default router.handler();