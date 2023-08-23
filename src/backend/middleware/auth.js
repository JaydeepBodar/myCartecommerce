import { getSession } from "next-auth/react";
export const isAuthenticateuser = async (req, res, next) => {
  const session = await getSession({ req });
  // console.log("sessiondata", session?.user);
  if (!session) {
    res.status(401).json({ message: "You need to first log in" });
  }
  req.user = session.user;
  next();
};
export const adminAuthorize =(...roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req?.user?.role)){
      res.status(401).json({message:"You are not authorize for this section your role must be Admin"})
    }
    else{
      next()
    }
  }
}
