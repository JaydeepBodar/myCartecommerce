import { createRouter } from "next-connect";
import db from "@/backend/db";
import { getReview,updateReview } from "@/backend/controller/productcontroller";
const router = createRouter();
db();
router.get(getReview);
router.put(updateReview)
export default router.handler();