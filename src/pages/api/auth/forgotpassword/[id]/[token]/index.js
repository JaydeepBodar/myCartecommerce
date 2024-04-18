import db from "@/backend/db";
import { createRouter } from "next-connect";
import {forgotpasswordverify,changePassword } from "@/backend/controller/authcontroller";
const router = createRouter();
db();
router.get(forgotpasswordverify)
router.post(changePassword)
export default router.handler();