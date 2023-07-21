import db from "@/backend/db";
import { createRouter } from "next-connect";
import {
  getAddress,
  postAddress,
} from "@/backend/controller/addresscontroller";
const router = createRouter();
db();
router.post(postAddress);
router.get(getAddress);
export default router.handler();
