import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import Userschema from "@/backend/model/Userschema";
import bcrypt from "bcrypt";
import db from "@/backend/db";
export default async function auth(req, res) {
  return await NextAuth(req, res, {
    session: {
      strategy: "jwt",
    },
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        async authorize(credentials, req) {
          await db();
          const { email, password } = credentials;
          if (!email || !password) {
            throw new Error("All field Required");
          } else {
            const user = await Userschema.findOne({ email: email });
            // console.log("process.env.API_URL", process.env.API_URL);
            if (user) {
              const checkpassword = await bcrypt.compare(
                password,
                user.password
              );
              if (checkpassword) {
                // console.log("user", user);
                return user;
              } else {
                throw new Error("Wrong password");
              }
            } else {
              throw new Error("User not Found");
            }
          }
        },
      }),
    ],
    callbacks: {
      jwt: async ({ token, user, profile }) => {
        user && (token.user = user);
        // console.log("req",req)
        // console.log("token",token)
        
        if (req.url === "/api/auth/session?update") {
          // hit the db and eturn the updated user
          // console.log("dtatatat")
          const updatedUser = await Userschema.findById(token.user._id);
          token.user = updatedUser;
          // console.log("updateUser",updatedUser)
        }
        return Promise.resolve(token)
      },
      session: async ({ session, token }) => {
        // console.log("session",session)
        // console.log("process.env.SECERTKEY",process.env.SECERTKEY)
        session.user = token.user;
        // for delete password in user session
        delete session?.user?.password;
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/Authentication/login",
    },
  });
}
