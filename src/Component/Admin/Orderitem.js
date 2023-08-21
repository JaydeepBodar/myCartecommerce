"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Orderitem = ({ order }) => {
  const { paymentInfo,orderStatus,_id} =order;
  return (
    <div className="flex text-[15px] leading-6 flex-wrap justify-between w-[100%] bg-[#f2f2f2] p-3 rounded-lg">
      <div>
        <h4>Order Id&nbsp;:-&nbsp;{_id}</h4>
        <h4>Payment Id&nbsp;:-&nbsp;{paymentInfo?.id}</h4>
      </div>
			<div>
				<Link className="block w-[100px] py-2 text-center rounded-lg bg-blue-600 text-white font-semibold tracking-wide" href={`/User/Admin/Orderview/${_id}`}>View Order</Link>
			</div>
			<div>
				<h4>Order Status&nbsp;:-&nbsp;{orderStatus}</h4>
				<h4>Payment Status&nbsp;:-&nbsp;{paymentInfo?.status}</h4>
			</div>
    </div>
  );
};

export default Orderitem;
