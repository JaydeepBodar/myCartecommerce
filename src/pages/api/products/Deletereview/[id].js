import { createRouter } from "next-connect";
import db from "@/backend/db";
import { deleteReview } from "@/backend/controller/productcontroller";
const router = createRouter();
db();
router.put(deleteReview);
export default router.handler();
