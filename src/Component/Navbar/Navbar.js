"use client";
import React, { useState, useEffect } from "react";
import Container from "../Container";
import Image from "next/image";
import Img from "../../../public/images/logo.jpeg";
import { MdAccountCircle } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Totalquantityt from "../Totalquantityt";
import { signIn, signOut, useSession } from "next-auth/react";
import { Globalusercontext } from "@/Context/Userproider";
const Navbar = () => {
  const { user, loaduser } = Globalusercontext();
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  useEffect(() => {
    loaduser();
  }, [user?.updatedAt]);
  // console.log("session", session);
  const [query, setquery] = useState("");
  const submitHandler = (e) => {
    // setquery(e.target.value)
    // console.log("query", query);
    if (query) {
      router.push(`?data=${query}`);
    } else {
      router.push("/");
    }
  };
  return (
    <header>
      <Container>
        <div className="flex justify-between items-center flex-wrap">
          <div className="max-lg:basis-[50%]">
            <Link href="/">
              <Image alt="logo" src={Img} className="w-40 object-fill h-13" />
            </Link>
          </div>
          {pathname === "/" && (
            <div
              className="flex max-lg:order-last max-lg:w-[100%] max-lg:mb-3"
              onKeyUp={submitHandler}
            >
              <input
                value={query}
                onChange={(e) => setquery(e.target.value)}
                placeholder="Search..."
                className="rounded-tl-lg w-[400px] max-md:w-[100%] rounded-bl-lg border-none outline-none bg-slate-200 px-3 py-1"
              />
              <button
                onClick={submitHandler}
                className=" tracking-wide w-[100%] max-w-[80px] bg-red-600 py-1 font-semibold  text-[#fff] rounded-tr-lg rounded-br-lg"
              >
                Search
              </button>
            </div>
          )}
          <div className="flex gap-x-3 max-lg:basis-[50%] justify-end">
            {session.status === "authenticated" ? (
              <Link
                href="/User"
                className="leading-[18px] flex items-center gap-x-[3px]"
                title="Profile"
              >
                <Image
                  src={
                    user?.length > 0
                      ? user[0]?.avatar
                      : session?.data?.user?.avatar
                  }
                  width={30}
                  alt={user?.name}
                  loading="lazy"
                  height={30}
                  className="w-[30px] h-[30px] rounded-full object-fill"
                />
                <p>
                  {user?.length > 0 ? user[0]?.name : session?.data?.user?.name}
                </p>
              </Link>
            ) : (
              <Link href="/login">
                <div className="flex font-semibold gap-2 items-center border-[1px] border-red-600 text-red-600 px-2 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                  <p>Sign in</p>
                  <MdAccountCircle className="w-6 h-6" title="Sign iIn" />
                </div>
              </Link>
            )}
            <Link href="/Cart" className="relative">
              <BsCart3 title="Cart" className="w-6 h-6" />
              <p className="absolute w-[25px] h-[25px] text-white bg-red-600 rounded-full leading-[25px] text-center top-[-18px] right-2">
                <Totalquantityt />
              </p>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
