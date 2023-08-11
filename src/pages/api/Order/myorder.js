import db from "@/backend/db";
import { createRouter } from "next-connect";
import { isAuthenticateuser } from "@/backend/middleware/auth";
import { getOrder } from "@/backend/controller/ordercontroller";
const router = createRouter();
db();
router.use(isAuthenticateuser).get(getOrder);
export default router.handler();