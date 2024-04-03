import db from "@/backend/db";
import { createRouter } from "next-connect";
import { singleCategory } from "@/backend/controller/productcontroller";
const router = createRouter();
// allproduct();
db();
router.get(singleCategory);
export default router.handler();
