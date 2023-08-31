import db from "@/backend/db";
import { createRouter } from "next-connect";
import { registerUser } from "@/backend/controller/authcontroller";
const router = createRouter();
db();
router.post(registerUser);
export default router.handler();