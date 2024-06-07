"use client";
import Container from "@/Component/Container";
import Inputdata from "@/Component/Inputdata";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { parseCallbackUrl } from "@/helper/getPricequeryparams";
import { Globalthemeprovider } from "@/Context/Themeprovider";
const Login = () => {
  const session = useSession();
  const router = useRouter();
  const [Input, setInput] = useState({
    email: "",
    password: "",
  });
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl");

  const { email, password } = Input;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...Input, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        ...Input,
        callbackUrl: callbackUrl ? parseCallbackUrl(callbackUrl) : "/",
      });
      // console.log("res", res);
      if (res.error) {
        toast.error(res.error);
      } else {
        return res;
      }
    } catch (err) {
      // console.log("datafirst");
      // console.log("err", err);
    }
  };
  if (session.status === "authenticated") {
    router.push("/User");
  }
  const { theme } = Globalthemeprovider();
  return (
    <React.Fragment>
      <Container>
        <div className=" pt-12 pb-14 md:mb-[4px] flex flex-col justify-center items-center">
          <div
            className={`${
              theme === true
                ? "bg-[#f2f2f2] text-[#000]"
                : "bg-[#000] text-[#f2f2f2]"
            } w-[500px] border-[1px] max-sm:max-w-[100%] mx-[auto] max-sm:px-10 max-sm:py-12 rounded-lg px-16 py-14`}
          >
            <h4 className="text-center font-semibold text-3xl mb-4 tracking-normal">
              Log in...
            </h4>
            <form className='text-[#000]'>
              <Inputdata
                onChange={handleChange}
                value={email}
                name="email"
                placeholder="Enter your Email..."
                label="Email"
                data="block w-[100%] text-[#000] mb-2 px-3 py-1 bg-[#fff] rounded-lg outline-none"
                className="flex-col"
              />
              <Inputdata
                type="password"
                onChange={handleChange}
                value={password}
                name="password"
                placeholder="Enter Your password..."
                label="password"
                data="block w-[100%] mb-2 px-3 py-1 bg-[#fff] rounded-lg outline-none"
                className="flex-col"
              />
              <button
                 onClick={handleSubmit}
                type="submit"
                className="w-[100%] max-sm:py-[5px] py-[10px] bg-[#197693] mt-2 mb-3 text-white font-semibold tracking-wide rounded-md"
              >
                Login
              </button>
            </form>
            <div className="flex items-center max-sm:flex-col justify-between">
              <Link
                href="/Authentication/Register"
                className="pt-2 flex justify-center hover:text-[#197693] transition-all duration-500"
              >
                Create New Account...
              </Link>
              <Link
                href="/Authentication/Resetpassword"
                className="pt-2 flex justify-center hover:text-[#197693] transition-all duration-500"
              >
                Forgot Password
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Login;
