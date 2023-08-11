"use client";
import React, { useState, useEffect } from "react";
import { Globalusercontext } from "@/Context/Userproider";
import { useSession } from "next-auth/react";
import Image from "next/image";
const Userprofileview = () => {
  const { user, setuser, loaduser } = Globalusercontext();
  const { data } = useSession();
	const[loading,setloading]=useState()
  useEffect(() => {
    setuser(user);
    loaduser();
  }, []);
  // console.log("data", data);
  const month = new Date(user?.createdAt).toLocaleString("en-us", {
    month: "short",
  });
  const day = new Date(user?.createdAt).getDate();
  const year = new Date(user?.createdAt).getFullYear();
  return (
    <div className="text-center w-[100%] sm:max-w-[400px] sm:mx-auto max-sm:h-[70vh] max-sm:flex max-sm:flex-col max-sm:justify-center">
      <div>
        <Image
          width={200}
          height={200}
          className="h-[200px] w-[200px] rounded-full mx-[auto]"
          src={user ? user?.avatar : data?.user?.avatar}
        />
      </div>
      <div className="text-xl content pt-4">
        <h4>Name :-&nbsp; {user?.name}</h4>
        <h4>Email :-&nbsp; {user?.email}</h4>
        <h4>
          <span className="font-semibold">Joined on:-&nbsp;</span>
          {day}&nbsp;{month}&nbsp;{year}
        </h4>
      </div>
    </div>
  );
};

export default Userprofileview;
