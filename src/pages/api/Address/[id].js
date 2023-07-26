import db from "@/backend/db";
import { createRouter } from "next-connect";
import {
    getoneAddress,
    updateaddress,
    deleteAddress
} from "@/backend/controller/addresscontroller";
import { isAuthenticateuser } from "@/backend/middleware/auth";
const router = createRouter();
db();
router.put(updateaddress);
router.delete(deleteAddress)
router.get(getoneAddress);
export default router.handler();