"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import Tostify from "../Tostify";
import { useRouter } from "next/navigation";
import { Globalthemeprovider } from "@/Context/Themeprovider";
const Orderitems = ({ item }) => {
  console.log("item", item);
  const {
    _id,
    name:title,
    image,
    orderStatus,
  } = item;
  const router = useRouter();
  const { theme } = Globalthemeprovider();
  // console.log("paymentInfo", paymentInfo);
  return (
    <Link href={`/User/Order/${_id}`} className={`border-[1px] bg-[#19769366]  border-[gray] flex justify-between items-center rounded-lg mb-2 p-4 max-sm:p-2`}>
      <div>
        <Image src={image[0]} height={80} width={80} className="w-[80px] h-[80px] object-fill rounded-full" />
      </div>
      <h4>{title}</h4>
      <h4>{orderStatus}</h4>
    </Link>
  );
};

export default Orderitems;
