import { createRouter } from "next-connect";
import db from "@/backend/db";
import { getalluser } from "@/backend/controller/authcontroller";
import { adminAuthorize, isAuthenticateuser } from "@/backend/middleware/auth";
const router = createRouter();
db();
router.use(isAuthenticateuser,adminAuthorize("Admin")).get(getalluser);
export default router.handler();