"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
const Sidebar = () => {
  const { data } = useSession();
  const [toggle, settoggle] = useState(false);
  const toggleData = () => {
    settoggle((data) => !data);
  };
  // console.log("toggle", toggle);
  return (
    <div
      className={`${
        toggle === true &&
        "fixed left-0 right-0 top-0 bottom-0 h-[100%] bg-zinc-900/70 z-30"
      }`}
      onScroll={() => settoggle(false)}
    >
      <div
        className={`${
          toggle === true
            ? "hidden"
            : "max-sm:flex max-sm:items-center max-sm:gap-x-2 z-10"
        }  sm:hidden`}
      >
        <AiOutlineMenu
          onClick={toggleData}
          className="w-[30px] h-[30px] fill-[#197693]"
        />
        <span className=" text-[#197693]">User profile</span>
      </div>
      <div
        onClick={() => settoggle(false)}
        className={`${
          toggle === true &&
          "max-sm:h-[100%] flex justify-center items-center relative"
        }`}
      >
        <AiOutlineClose
          className={`${
            toggle === true
              ? "max-sm:block absolute text-center w-[30px] h-[30px] bottom-0"
              : "max-sm:hidden"
          } sm:hidden fill-[#f2f2f2] ${
            data?.user?.role === "Admin" || data?.user?.role === "Retailer" ? "top-[25%]" : "top-[35%]"
          }`}
          onClick={() => settoggle(false)}
        />
        <ul
          className={`${
            toggle === true ? "responsive" : "hidedata"
          } sidebar sm:basis-[25%] max-sm:pr-2 pr-6`}
          onClick={() => settoggle(false)}
        >
          {data?.user?.role === "Admin" || data?.user?.role === "Retailer" ? (
            <>
              {" "}
              <li>
                <Link href="/User/Admin/Anyalitic">
                  Dashboard<span>({data?.user?.role})</span>
                </Link>
              </li>
              <li>
                <Link href="/User/Admin/Addproduct">
                  Add New Product<span>({data?.user?.role})</span>
                </Link>
              </li>
              <li className="">
                <Link href="/User/Admin/Allproduct">
                  All Product<span>({data?.user?.role})</span>
                </Link>
              </li>
              <li>
                <Link href="/User/Admin/AllOrder">
                  All Order<span>({data?.user?.role})</span>
                </Link>
              </li>
              {data?.user?.role === "Admin" && (
                <li>
                  <Link href="/User/Admin/Alluser">
                    All User<span>({data?.user?.role})</span>
                  </Link>
                </li>
              )}
            </>
          ) : (
            ""
          )}
          <li className={`${data?.user?.role !== "user" && "border-t-[1px] border-[#d4d3d3]"}`}>
            <Link href="/User/Profile">Your Profile</Link>
          </li>
          <li>
            <Link href="/User/Order">Your Order</Link>
          </li>
          <li>
            <Link href="/User/update">Update Profile</Link>
          </li>
          <li className="border-b-[1px] border-[#d4d3d3]">
            <Link href="/User/updatepassword">Update Password</Link>
          </li>

          <li
            className="cursor-pointer text-[#197693]"
            onClick={() => signOut({callbackUrl:"/Authentication/login"})}
          >
            Log out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
