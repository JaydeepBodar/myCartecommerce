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
  const { _id, name: title, image, orderStatus, createdAt,paymentId } = item;
  const month = new Date(createdAt).toLocaleString("en-us", {
    month: "short",
  });
  const day = new Date(createdAt).getDate();
  const year = new Date(createdAt).getFullYear();
  const router = useRouter();
  const { theme } = Globalthemeprovider();
  // console.log("paymentInfo", paymentInfo);
  return (
    <Link
      href={`/User/Order/${_id}`}
      className={`border-[1px] bg-[#19769366] block border-[gray] rounded-lg mb-2 p-4 max-sm:p-2`}
    >
      <div className="leading-6 mb-3 border-b-[1px] border-b-[gray] flex justify-between flex-wrap">
        <div>
          <h4>
            Ordered on:-&nbsp;{day}-{month}-{year}
          </h4>
          <h4>Order id:-&nbsp;{_id}</h4>
        </div>
        <h5>Payment id:-&nbsp;{paymentId}</h5>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <Image
            src={image[0]}
            height={80}
            width={80}
            className="w-[80px] h-[80px] object-fill rounded-full"
          />
        </div>
        <h4>{title}</h4>
        <h4>{orderStatus}</h4>
      </div>
    </Link>
  );
};

export default Orderitems;
