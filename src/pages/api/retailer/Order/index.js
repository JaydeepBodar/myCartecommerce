import db from "@/backend/db";
import { createRouter } from "next-connect";
import { getallOrderforretailer } from "@/backend/controller/ordercontroller";
import { isAuthenticateuser, adminAuthorize } from "@/backend/middleware/auth";
const router = createRouter();
// allproduct();
db();
router.use(isAuthenticateuser,adminAuthorize("Retailer","Admin")).get(getallOrderforretailer);
export default router.handler();
