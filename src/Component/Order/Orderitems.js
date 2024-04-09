"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import Tostify from "../Tostify";
import { useRouter } from "next/navigation";
import { Globalthemeprovider } from "@/Context/Themeprovider";
const Orderitems = ({ item }) => {
  console.log("item", item);
  const {
    orderItems,
    paymentInfo,
    user,
    shippingInfo,
    createdAt,
    _id,
    orderStatus,
  } = item;
  const router = useRouter();
  const { street, state, country, zipcode, phoneNo, city } = shippingInfo;
  const { id, status, taxPaid, amountPaid } = paymentInfo;
  const { name, email } = user;
  const month = new Date(createdAt).toLocaleString("en-us", {
    month: "short",
  });
  const day = new Date(createdAt).getDate();
  const year = new Date(createdAt).getFullYear();
  const { theme } = Globalthemeprovider();
  const deleteOrderitem = () => {
    let text =
      "if you really want to delete your order ? if yes then press ok otherwise press cancle";
    if (window.confirm(text) == true) {
      axios
        .delete(`${process.env.API_URL}api/Order/${_id}`, { item })
        .then((res) => toast.success(res?.data?.message))
        .catch((e) => console.log("eeee", e))
        .finally(() => router.refresh());
    }
  };
  // console.log("paymentInfo", paymentInfo);
  return (
    <div className="border-[1px] border-[#cecbcb] rounded-lg px-4 py-5 mb-2 text-[14px] max-sm:text-[13px] leading-[22px]">
      <Tostify />
      <div className="mb-2 border-b-[1px] border-[#cecbcb]">
        <h3 className="text-lg font-semibold">Order-summury</h3>
        <div className="flex justify-between flex-wrap items-start">
          <div>
            {" "}
            <h4>Order id:-&nbsp;{_id}</h4>
            <h4
              className={`${
                orderStatus === "Processing" ? "text-[red]" : "text-[green]"
              }`}
            >
              Order Status:-&nbsp;{orderStatus}
            </h4>
          </div>
          <h4>
            Ordered date:-&nbsp;{day}-{month}-{year}
          </h4>
        </div>
      </div>
      <div className="flex justify-between items-start flex-wrap">
        <div>
          <h4 className="font-semibold">User details</h4>
          <h5>{name}</h5>
          <h5>{email}</h5>
        </div>
        <div>
          <h4 className="font-semibold">Shiping address</h4>
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
        <div>
          <h4 className="font-semibold">Payment details</h4>
          <h5>Payment id:-&nbsp;{id}</h5>
          <h5>Status:-&nbsp;{status} </h5>
          <h5>Tax :-&nbsp;{taxPaid}₹</h5>
          <h5>Total(with tax) :-&nbsp;{amountPaid}₹</h5>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-4 justify-between items-center mt-7 max-sm:mt-3 border-t-[1px] border-[#cecbcb] pt-2">
        {orderItems?.map((val, index) => {
          {
            /* console.log("val", val) */
          }

          const { name, quantity, image, price, color, size } = val;
          return (
            <div
              key={index}
              className="flex items-center gap-x-4 gap-y-2 font-semibold"
            >
              <div className="flex items-center gap-x-2 max-sm:gap-x-1 max-sm:basis-[45%]">
                <Image
                  src={image[0]}
                  width={80}
                  alt={name}
                  height={80}
                  loading="lazy"
                  className="border-[1px] border-[#cecbcb] object-fill rounded-lg w-[80px] h-[80px] "
                />
                <p className="flex">
                  <span>x&nbsp;</span> {quantity}
                </p>
              </div>
              <div>
                <h5>Product:-&nbsp;{name}</h5>
                <h4>Price:-&nbsp;{price}₹</h4>
                <h5 className="flex items-center gap-x-2">
                  {color?.length > 0 && (
                    <div
                      className={`${
                        theme === true ? "border-[#000000]" : "border-[#f2f2f2]"
                      } p-[2px] rounded-full border-[1px]`}
                    >
                      <span
                        style={{ backgroundColor: color }}
                        className="w-[10px] h-[10px] rounded-full block"
                      ></span>
                    </div>
                  )}
                  <span>{size}</span>
                </h5>
              </div>
            </div>
          );
        })}
      </div>
      {orderStatus === "Delivered" ? (
        ""
      ) : (
        <div className="text-right pt-2" onClick={deleteOrderitem}>
          <button className="w-[100%] font-semibold tracking-wide text-center max-w-[80px] text-[14px] py-1 rounded-lg border-[1px] border-red-600 text-red-600 hover:bg-red-600 hover:text-[#fff] hover:transition-all hover:duration-1000">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Orderitems;
