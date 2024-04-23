import { createRouter } from "next-connect";
import db from "@/backend/db";
import {orderanylitic} from "@/backend/controller/ordercontroller"
import { adminAuthorize, isAuthenticateuser } from "@/backend/middleware/auth";
const router = createRouter();
db();
// router.use(isAuthenticateuser,adminAuthorize("Admin")).get(orderanylitic);
router.use(isAuthenticateuser).get(orderanylitic)
export default router.handler();