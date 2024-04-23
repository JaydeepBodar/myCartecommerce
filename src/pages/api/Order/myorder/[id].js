import db from "@/backend/db";
import { createRouter } from "next-connect";
import { isAuthenticateuser } from "@/backend/middleware/auth";
import { getsingleuserorder } from "@/backend/controller/ordercontroller";
const router = createRouter();
db();
router.use(isAuthenticateuser).get(getsingleuserorder);
export default router.handler();