import db from "@/backend/db";
import { createRouter } from "next-connect";
import { checkoutsession } from "@/backend/controller/ordercontroller";
const router = createRouter();
db();
router.post(checkoutsession);
export default router.handler();