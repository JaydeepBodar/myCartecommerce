import { withAuth } from "next-auth/middleware";
export default withAuth(
  async function middleware(req) {
    console.log("req.nextauth.token", req.nextauth.token);
  }
  // {
  //   callbacks: {
  //     authorized: ({ token }) => {
  //       if (!token) {
  //         return false;
  //       }
  //     },
  //   },
  // }
);
export const config = {
  matcher: [
    "/User",
    "/Address/New",
    "/Address/:path*",
    "/User/update",
    "/User/Profile",
    "/shiping",
    "/User/Order",
    "/User/Admin/Addproduct",
    "/User/Admin/updateProduct/:path*",
    "/User/Admin/AllOrder",
    "/User/Admin/Orderviewdata/:path*",
    "/User/Order/:path*",
    "/User/Admin/updateProduct",
    "/User/Admin/Allproduct",
    "/User/Admin/Alluser",
    "/User/Admin/Anyalitic"
  ],
};
