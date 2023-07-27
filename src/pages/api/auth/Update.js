import db from "@/backend/db";
import { createRouter } from "next-connect";
import { updateUser } from "@/backend/controller/authcontroller";   
const router = createRouter();
db();
router.put(updateUser);
export default router.handler();