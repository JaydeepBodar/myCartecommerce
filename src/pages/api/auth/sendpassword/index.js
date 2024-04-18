import db from "@/backend/db";
import { createRouter } from "next-connect";
import { resetPassword,forgotpasswordverify } from "@/backend/controller/authcontroller";
const router = createRouter();
db();
router.post(resetPassword);
export default router.handler();