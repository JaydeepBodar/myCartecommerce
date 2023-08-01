import db from "@/backend/db";
import { createRouter } from "next-connect";
import { updateUser } from "@/backend/controller/authcontroller";  
import upload from "@/backend/utils/multer"; 
const router = createRouter();
db();
// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };
router.put(updateUser); 
export default router.handler();