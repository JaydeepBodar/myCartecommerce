"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import avtar from "../../../public/images/useravatar.png";
import axios from 'axios'
import { ImLocation } from "react-icons/im";
import { useRouter } from "next/navigation";
import { Globalusercontext } from "@/Context/Userproider";
const Profile = ({address}) => {
  const router=useRouter()
  const[loading,setloading]=useState(true)
  useEffect(()=>{
    if(address){
      setloading(false)
    }
    router.refresh()
  },[loading])
  const{user}=Globalusercontext()
  // console.log("data", data);
  const month = new Date(user?.createdAt).toLocaleString("en-us", {
    month: "short",
  });
  const day = new Date(user?.createdAt).getDate();
  const year = new Date(user?.createdAt).getFullYear();
  return (
    <div className="p-4 max-md:p-2 border-[1px] border-[#cecbcb] rounded-lg">
      <div className="flex items-center gap-x-7 pb-5 max-md:gap-x-2	">
        <div>
          <Image
            src={user?.avtar ? user?.avtar : avtar}
            width={100}
            height={100}
            className="rounded-full"
          />
        </div>
        <div className="text-[18px] max-md:text-[15px]">
          <h4 className="capitalize font-semibold">{user?.name}</h4>
          <div className="flex gap-x-3 flex-wrap items-center">
            <h5>
              <span className="font-semibold">Email:-&nbsp;</span>
              {user?.email}
            </h5>
            <h5>
              <span className="font-semibold">Joined on:-&nbsp;</span>
              {day}&nbsp;{month}&nbsp;{year}
            </h5>
          </div>
        </div>
      </div>
      <div className="py-4 max-md:py-2 border-t-[1px] border-b-[1px] border-[#cecbcb] ">
        {loading && <p className="text-center">Loading</p>}
        {!loading && address?.map((add, index) => {
          console.log("add", add);
          const { street, city, country, phoneNo, state, zipcode,_id } = add;
          return (
            <div key={index} className="pb-4 max-sm:text-[14px]">
              <Link
                href={`/Address/${_id}`}
                className="leading-[25px] flex gap-x-4"
                title="address"
              >
                <ImLocation className="w-[50px] h-[40px] fill-red-600" />
                <div>
                  <p>
                    {street}, {city},
                  </p>{" "}
                  <p>
                    {state} ,{country},
                  </p>{" "}
                  <p>
                    Contact:-{phoneNo} ,Postalcode:-{zipcode};
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
        <Link
          href="/Address/New"
          className="w-[100%] text-center max-w-[160px] max-sm:text-[14px] max-sm:max-w-[120px] text-[17px] py-1 rounded-lg border-[1px] border-red-600 text-red-600 block"
        >
          <button className="flex items-center justify-center w-[100%] gap-x-2 max-md:gap-x-[2px]">
            <AiOutlinePlus />
            Add Address
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
