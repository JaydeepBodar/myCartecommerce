"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const Orderview = ({ order }) => {
  const { paymentInfo, shippingInfo, orderItems, orderStatus, _id, user } =
    order;
  const { street, state, country, city, zipcode, phoneNo } = shippingInfo;
  const router = useRouter();
  const [dropdown, setdropdown] = useState(orderStatus);
  const updateDetail =() => {
    axios
      .put(`${process.env.API_URL}api/Order/${_id}`, {
        orderStatus: dropdown,
      })
      .then((res) => {
        router.push("/User/Admin/AllOrder")
				router.refresh();
      })
      .catch((e) => console.log("e", e));
  };
  return (
    <div className=" bg-[#f2f2f2] p-4 rounded-lg adminorder leading-6">
      <div className="flex flex-wrap gap-x-3 justify-between w-[100%] max-lg:gap-y-3">
        <div>
          <h4>Order Details</h4>
          <h5>User Name&nbsp;:-&nbsp;{user?.name}</h5>
          <h5>Order id&nbsp;:-&nbsp;{_id}</h5>
          <h5>Payment id&nbsp;:-&nbsp;{paymentInfo?.id}</h5>
          <h5>Payment Status&nbsp;:-&nbsp;{paymentInfo?.status}</h5>
          <h5>Tax&nbsp;:-&nbsp;{paymentInfo?.taxPaid}$</h5>
          <h5>
            Total Payment(including Tax)&nbsp;:-&nbsp;{paymentInfo?.amountPaid}$
          </h5>
        </div>
        <div className="flex flex-col">
          <h4>Order Status</h4>
          <select
            name="dropdown"
            value={dropdown}
            className="p-2 rounded-lg bg-[#fff] text-[14px]"
            onChange={(e) => setdropdown(e.target.value)}
          >
            <option>Processing</option>
            <option>Delivered</option>
          </select>
          <button
            onClick={updateDetail}
            className="text-[14px] w-[100%] max-w-[100px] bg-[red] text-white mt-2 py-1 font-semibold rounded-lg"
          >
            Update
          </button>
        </div>
        <div>
          <h4>Shiping address</h4>
          <h5>{street},</h5>
          <h5>
            <span>{state}</span>,&nbsp;
            <span>{country}</span>,
          </h5>
          <h5>
            <span>{city}</span>-<span>{zipcode}</span>,
          </h5>
          <h5>Mobile No:-&nbsp;{phoneNo}</h5>
        </div>
      </div>
      <div className="border-t-[1px] border-[gray] mt-3 pt-3">
        <h4>Items Details</h4>
        <div className="flex">
          {orderItems.map((val,index) => {
            const { name, quantity, price,image } = val;
            return (
              <div key={index} className="flex items-center basis-[49%] max-sm:basis-[100%] gap-x-7 bg-[#fff] p-3 rounded-lg">
								<div className="flex items-center">
									<Image width={90} height={90} src={image} className="w-[90px] h-[90px] rounded-full" alt={name}/>
									<span>&nbsp;x&nbsp;{quantity}</span>
								</div>
                <div>
                  <h5>
                    Title&nbsp;:-&nbsp;{name}
                  </h5>
                  <h5>Price&nbsp;:-&nbsp;{price}$</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
			<Link className="inline-block text-[14px] text-center w-[100px] bg-[#fff] border-[1px] border-[red] text-red-600 mt-2 py-1 font-semibold rounded-lg" href="/User/Admin/AllOrder">Back</Link>
    </div>
  );
};

export default Orderview;
