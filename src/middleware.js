import { withAuth } from "next-auth/middleware";
export default withAuth(
    async function middleware(req){
        // authorize
    }
) 

export const config = {
  matcher: ["/User"],  
};
