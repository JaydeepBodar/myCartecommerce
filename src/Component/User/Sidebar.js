'use client'
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React,{useState} from "react";
import {AiOutlineMenu} from "react-icons/ai"
const Sidebar = () => {
  const { data } = useSession();
  const [toggle,settoggle]=useState(false);
  const toggleData=()=>{
    settoggle(data=>!data)
  }
  console.log("toggle",toggle)
  return (
    <div>
      <AiOutlineMenu onClick={toggleData}/>
      <ul className={`${toggle === true ? "responsive" : "hidedata"} sidebar basis-[25%] max-sm:basis-[35%] max-sm:pr-2 pr-6`}>
        {data?.user?.role === "admin" ? (
          <>
            {" "}
            <li>    
              <Link href="/">
                New Product<span>(admin)</span>
              </Link>
            </li>
            <li>
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
  );
};

export default Sidebar;
