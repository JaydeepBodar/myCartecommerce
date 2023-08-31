import { createRouter } from "next-connect";
import db from "@/backend/db";
import { updateUserRole } from "@/backend/controller/authcontroller";
import { adminAuthorize, isAuthenticateuser } from "@/backend/middleware/auth";
const router = createRouter();
db();
router.put(updateUserRole);
export default router.handler();