import { createRouter } from "next-connect";
import db from "@/backend/db";
import { getallOrder } from "@/backend/controller/ordercontroller";
import { adminAuthorize, isAuthenticateuser } from "@/backend/middleware/auth";
const router = createRouter();
db();
router.use(isAuthenticateuser,adminAuthorize("Retailer","Admin")).get(getallOrder);
export default router.handler();