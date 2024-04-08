"use client";
import React, { useState, useEffect } from "react";
import { IoSunny } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import Container from "../Container";
import Image from "next/image";
import Img from "../../../public/images/logo.png";
import { MdAccountCircle } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Totalquantityt from "../Totalquantityt";
import { signIn, signOut, useSession } from "next-auth/react";
import { Globalusercontext } from "@/Context/Userproider";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { Globalthemeprovider } from "@/Context/Themeprovider";
const Navbar = () => {
  const { user, loaduser } = Globalusercontext();
  const { theme, settheme } = Globalthemeprovider();
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  useEffect(() => {
    loaduser();
  }, [user?.updatedAt]);
  const [query, setquery] = useState("");
  const [product, setproduct] = useState([]);
  const [block, setblock] = useState(true);
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}api/searchproduct?search=${query}`)
      .then((res) => setproduct(res.data.productdata))
      .catch((e) => console.log("eee", e));
  }, [query, block]);
  const submitHandler = (e) => {};
  const secondnav = [
    { path: "/", label: "Home" },
    { path: "/Allshop", label: "All" },
    { path: "/productcategory/men", label: "Men's" },
    { path: "/productcategory/women", label: "Women's" },
    { path: "/productcategory/electronics", label: "Electronics" },
  ];
  return (
    <header>
      <Container>
        <div className="flex justify-between items-center flex-wrap">
          <div className="max-lg:basis-[50%]">
            <Link href="/">
              <Image
                alt="logo"
                src={Img}
                className="w-[100px] object-cover h-[80px]"
              />
            </Link>
          </div>
          <div
            className="flex max-lg:order-last max-lg:w-[100%] max-lg:mb-3 relative"
            onKeyUp={submitHandler}
          >
            <IoIosSearch className="absolute text-[25px] fill-[gray] top-[14%] left-[10px] z-10" />
            <div className="w-[400px] max-md:w-[100%] relative">
              <input
                value={query}
                onChange={(e) => setquery(e.target.value)}
                onClick={() => setblock(true)}
                placeholder="Search..."
                className={`${
                  theme === true
                    ? "bg-[#f2f2f2] text-[#000]"
                    : "bg-[#000] text-[#f2f2f2]"
                } w-[100%] border-[1px] border-[#f2f2f2] outline-none pl-10 py-1 rounded-lg`}
              />
              <div
                className={`${
                  theme === true
                    ? "bg-[#f2f2f2] text-[#000]"
                    : "bg-[#000] text-[#f2f2f2]"
                } z-[999] absolute top-11 left-0 right-0 rounded-lg`}
              >
                {query.length > 1 && block && (
                  <div
                    className={`${
                      theme === true
                        ? "bg-[#f2f2f2] text-[#000] border-[#f2f2f2]"
                        : "bg-[#000] text-[#f2f2f2]  border-[#f2f2f2]"
                    } border-[1px] h-[100%] max-h-[440px] overflow-y-auto scrollbar my-2`}
                  >
                    {product.length === 0 && (
                      <p className="font-bold text-xl text-center max-sm:text-base py-3">
                        No Product found 
                      </p>
                    )}
                    {product?.map((val, index) => {
                      const {
                        title,
                        category,
                        thumbnail,
                        discountPercentage,
                        _id,
                      } = val;
                      return (
                        <Link
                          href={`/productdata/${_id}`}
                          onClick={() => setblock(false)}
                          key={index}
                        >
                          <div className={`m-3 flex gap-x-2 p-2`}>
                            <Image
                              src={thumbnail}
                              width={70}
                              height={70}
                              className="w-[70px] h-[70px] object-cover"
                            />
                            <div className="leading-6">
                              <h3 className="font-semibold">{title}</h3>
                              <span>{category}</span>
                              <span className="text-green-600 pl-2">
                                {discountPercentage}%&nbsp;OFF
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-x-3 max-lg:basis-[50%] justify-end items-center">
            <div onClick={() => settheme(!theme)}>
              {theme ? <IoSunny /> : <FaRegMoon />}
            </div>
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
              <Link href="/Authentication/login">
                <div className="flex font-semibold gap-2 items-center border-[1px] border-red-600 text-red-600 px-2 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                  <p>Sign in</p>
                  <MdAccountCircle className="w-6 h-6" title="Sign In" />
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
        {pathname !== "/Cart" || pathname === "/shiping" ? (
          <div>
            <ul className="flex justify-between border-[1px] border-[#cecbcb] rounded-lg mb-4">
              {secondnav?.map((value, index) => {
                const { path, label } = value;
                return (
                  <Link
                    key={index}
                    href={path}
                    className={`${
                      pathname === path &&
                      "bg-red-600 text-white block rounded-lg"
                    } cursor-pointer text-center w-[100%] font-semibold py-1 max-sm:text-[13px] transtiton-all duration-500`}
                  >
                    <li>{label}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
      </Container>
    </header>
  );
};

export default Navbar;
