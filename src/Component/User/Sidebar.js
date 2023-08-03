"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineMenu,AiOutlineClose } from "react-icons/ai";
const Sidebar = () => {
  const { data } = useSession();
  const [toggle,settoggle]=useState(false);
  const toggleData=()=>{
    settoggle(data=>!data)
  } 
  console.log("toggle", toggle);
  return (
    <div
      className={`${
        toggle === true && "absolute left-0 right-0 top-0 bottom-0 bg-zinc-900/70"
      }`}
    >
      <AiOutlineMenu
        onClick={toggleData}
        className={`${toggle === true ? "hidden" : " max-sm:block w-[30px] h-[30px] fill-red-600"} sm:hidden`}
      />
      <div
        className={`${
          toggle === true && "max-sm:h-[100vh] flex justify-center items-center relative"
        }`}
      >
        <AiOutlineClose className={`${toggle===true ? "max-sm:block absolute top-[35%] text-center w-[30px] h-[30px]" : "max-sm:hidden"} sm:hidden fill-[#f2f2f2]`} onClick={()=>settoggle(false)}/>
        <ul
          className={`${
            toggle === true ? "responsive" : "hidedata"
          } sidebar basis-[25%] max-sm:basis-[35%] max-sm:pr-2 pr-6`}
          onClick={() => settoggle(false)}
        >
          {data?.user?.role === "admin" ? (
            <>
              {" "}
              <li>
                <Link href="/">
                  New Product<span>(admin)</span>
                </Link>
              </li>
              <li className="">
                <Link href="/">
                  All Product<span>(admin)</span>
                </Link>
              </li>
              <li>
                <Link href="/">
                  All Order<span>(admin)</span>
                </Link>
              </li>
              <li className="border-b-[1px] border-[#d4d3d3]">
                <Link href="/">
                  All User<span>(admin)</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/User/Profile">Your Profile</Link>
              </li>
              <li>
                <Link href="/">Update Order</Link>
              </li>
              <li>
                <Link href="/User/update">Update Profile</Link>
              </li>
              <li className="border-b-[1px] border-[#d4d3d3]">
                <Link href="/User/updatepassword">Update Password</Link>
              </li>
            </>
          )}
          <li className="cursor-pointer text-red-600" onClick={() => signOut()}>
            Log out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
