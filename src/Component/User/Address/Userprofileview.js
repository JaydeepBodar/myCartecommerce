"use client";
import React, { useState, useEffect } from "react";
import { Globalusercontext } from "@/Context/Userproider";
import { useSession } from "next-auth/react";
import Image from "next/image";
const Userprofileview = () => {
  const { user, setuser, loaduser } = Globalusercontext();
  const { data } = useSession();
	// const[loading,setloading]=useState()
  useEffect(() => {
    loaduser();
  }, []);
  // console.log("data", data);
  const date=user?.length > 0 ? user[0]?.createdAt : data?.user?.createdAt
  const month = new Date(date).toLocaleString("en-us", {
    month: "short",
  });
  const day = new Date(date).getDate();
  const year = new Date(date).getFullYear();
  return (
    <div className="text-center w-[100%] sm:max-w-[400px] sm:mx-auto max-sm:h-[70vh] max-sm:flex max-sm:flex-col max-sm:justify-center">
      <div>
        <Image
          width={200}
          height={200}
          alt={data?.user?.name}
          className="h-[200px] w-[200px] rounded-full mx-[auto]"
          src={user?.length > 0 ? user[0]?.avatar : data?.user?.avatar}
        />
      </div>
      <div className="text-xl content pt-4">
        <h4>Name :-&nbsp; {user?.length > 0 ? user[0]?.name : data?.user?.name}</h4>
        <h4>Email :-&nbsp; {user?.length > 0 ? user[0]?.email : data?.user?.email}</h4>
        <h4>
          <span className="font-semibold">Joined on:-&nbsp;</span>
          {day}&nbsp;{month}&nbsp;{year}
        </h4>
      </div>
    </div>
  );
};

export default Userprofileview;
