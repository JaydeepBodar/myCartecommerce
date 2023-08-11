"use client";
import React from "react";
import Image from "next/image";
const Orderitems = ({ item }) => {
  console.log("item", item);
  const { orderItems, paymentInfo, user, shippingInfo,createdAt,_id,orderStatus } = item;
  const{street,state,country,zipcode,phoneNo,city}=shippingInfo
  const{id,status,taxPaid,amountPaid}=paymentInfo
  const{name,email}=user
  const month = new Date(createdAt).toLocaleString("en-us", {
    month: "short",
  });
  const day = new Date(createdAt).getDate();
  const year = new Date(createdAt).getFullYear();
  // console.log("paymentInfo", paymentInfo);
  return (
    <div className="border-[1px] border-[#cecbcb] rounded-lg px-4 py-5 mb-2 text-[14px] max-sm:text-[13px] leading-[22px]">
      <div className="mb-2 border-b-[1px] border-[#cecbcb]">
        <h3 className="text-lg font-semibold">Order-summury</h3>
        <div className="flex justify-between flex-wrap items-start">
          <div>
            {" "}
            <h4>Order id:-&nbsp;{_id}</h4>
            <h4
              className={`${
                orderStatus === "Processing"
                  ? "text-[red]"
                  : "text-[green]"
              }`}
            >
              Order Status:-&nbsp;{orderStatus}
            </h4>
          </div>
            <h4>Ordered date:-&nbsp;{day}-{month}-{year}</h4>
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
            <span>{city}</span>-
            <span>{zipcode}</span>,
          </h5>
          <h5>Mobile No:-&nbsp;{phoneNo}</h5>
        </div>
        <div>
          <h4 className="font-semibold">Payment details</h4>
          <h5>Payment id:-&nbsp;{id}</h5>
          <h5>Status:-&nbsp;{status} </h5>
          <h5>Tax :-&nbsp;{taxPaid}$</h5>
          <h5>Toatal(with tax) :-&nbsp;{amountPaid}$</h5>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-2 justify-between items-center mt-7 max-sm:mt-3 border-t-[1px] border-[#cecbcb] pt-2">
        {orderItems?.map((val,index) => {
          {/* console.log("val", val); */}
          const { name, quantity, image, price } = val;
          return (
            <div key={index} className="basis-[49%] max-sm:basis-[100%] flex items-center gap-x-4 gap-y-2 font-semibold">
              <div className="flex items-center gap-x-2 max-sm:gap-x-1 max-sm:basis-[45%]">
                <Image
                  src={image[0]}
                  width={80}
                  height={80}
                  className="border-[1px] border-[#cecbcb] rounded-lg w-[80px] h-[80px]"
                />
                <p className="flex">
                  <span>x</span> {quantity}
                </p>
              </div>
              <div>
                <h5>Product:-&nbsp;{name}</h5>
                <h4>Price:-&nbsp;{price}$</h4>
              </div>
            </div>
          );
        })}
      </div>{" "}
    </div>
  );
};

export default Orderitems;
