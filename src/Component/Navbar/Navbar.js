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
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
const Navbar = () => {
  const { user, loaduser } = Globalusercontext();
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
  console.log("session", query.leng);
  const submitHandler = (e) => {};
  const secondnav = [
    { path: "/", label: "Home" },
    { path: "/Allshop", label: "All" },
    { path: "/Men", label: "Men's" },
    { path: "/Women", label: "Women's" },
    { path: "/Electronics", label: "Electronics" },
  ];

  return (
    <header>
      <Container>
        <div className="flex justify-between items-center flex-wrap">
          <div className="max-lg:basis-[50%]">
            <Link href="/">
              <Image alt="logo" src={Img} className="w-40 object-fill h-13" />
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
                className="w-[100%] border-none outline-none bg-[#f2f2f2] pl-10 py-1 rounded-lg"
              />
              <div className="absolute top-10 z-10 bg-[#f2f2f2] left-0 right-0 rounded-lg">
                {query.length > 1 && block && (
                  <div className=" h-[100%] max-h-[440px] overflow-y-auto scrollbar mr-2 my-2">
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
                          <div
                            className="m-3 flex gap-x-2 bg-[#fff] p-2"
                          >
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
                      pathname === path && "bg-red-600 text-white"
                    } border-r-[1px] border-r-[#cecbcb] text-center w-[100%] font-semibold py-1 max-sm:text-[13px]`}
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
