import db from "@/backend/db";
import { createRouter } from "next-connect";
import {
  getAddress,
  postAddress,
} from "@/backend/controller/addresscontroller";
import { isAuthenticateuser } from "@/backend/middleware/auth";
const router = createRouter();
db();
router.post(postAddress);
router.use(isAuthenticateuser).get(getAddress);
export default router.handler();
