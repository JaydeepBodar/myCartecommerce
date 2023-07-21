import { withAuth } from "next-auth/middleware";
console.log("process.env",process.env.SECERTKEY)
export default withAuth(
  async function middleware(req){
    // console.log("req.nextauth.token",req.nextauth.token)
    }
)
export const config={
  matcher: ["/User"],  
} 
