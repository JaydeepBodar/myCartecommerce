import db from "@/backend/db";
import { createRouter } from "next-connect";
import { isAuthenticateuser } from "@/backend/middleware/auth";
import { getsingleuserorder,deleteOrder } from "@/backend/controller/ordercontroller";
const router = createRouter();
db();
router.use(isAuthenticateuser).get(getsingleuserorder);
router.use(isAuthenticateuser).delete(deleteOrder)
export default router.handler();