import db from "@/backend/db";
import { createRouter } from "next-connect";
import { getUser } from "@/backend/controller/authcontroller";
import { isAuthenticateuser } from "@/backend/middleware/auth";
const router = createRouter();
db();
router.use(isAuthenticateuser).get(getUser);
export default router.handler();