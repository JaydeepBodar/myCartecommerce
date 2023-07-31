import db from "@/backend/db";
import { createRouter } from "next-connect";
import { update_password } from "@/backend/controller/authcontroller";  
const router = createRouter();
db();
router.put(update_password);
export default router.handler();