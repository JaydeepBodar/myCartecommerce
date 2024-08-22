"use client";
import { Globalthemeprovider } from "@/Context/Themeprovider";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader";
import Notfound from "../../../public/images/Noimage.jpg"

const Orderview = ({ order, loading }) => {
  const { data } = useSession();
  // console.log("order", order);
  const {
    status,
    shippingInfo,
    orderStatus,
    _id,
    user,
    paymentId,
    amountPaid,
    image,
    name: title,
    price,
    retailerId,
    quantity,
    size,
    color,                                      
  } = order;
  const { theme } = Globalthemeprovider();
  const [dropdown, setdropdown] = useState("");
  const router = useRouter();
  const updateDetail = async () => {
    await axios
      .put(`${process.env.API_URL}api/Order/${_id}`, { orderStatus: dropdown })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((e) => console.log("e", e))
      .finally(() => {
        router.refresh();
        router.push("/User/Admin/AllOrder");
      });
  };
  return (
    <React.Fragment>
      {loading && (
        <div className="h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && (
        <div
          className={`${
            theme === true
              ? "bg-[#f2f2f2] text-[#000]"
              : "bg-[#000] text-[#f2f2f2]"
          } border-[#f2f2f2] border-[1px] p-4 rounded-lg adminorder leading-6`}
        >
          <div className="flex flex-wrap gap-x-3 justify-between w-[100%] max-lg:gap-y-3">
            <div>
              <h4>Order Details</h4>
              <h5>User Name&nbsp;:-&nbsp;{user?.name}</h5>
              <h5>Order id&nbsp;:-&nbsp;{_id}</h5>
              <h5>Payment id&nbsp;:-&nbsp;{paymentId}</h5>
              <h5>Payment Status&nbsp;:-&nbsp;{status}</h5>
              <h5>
                Total Payment&nbsp;:-&nbsp;
                {amountPaid}₹
              </h5>
            </div>
            <div className="flex flex-col">
              <h4>Order Status</h4>
              <select
                name="dropdown"
                value={dropdown ? dropdown : orderStatus}
                className="p-2 rounded-lg bg-[#fff] text-[#000] text-[14px]"
                onChange={(e) => setdropdown(e.target.value)}
              >
                <option name="dropdown" value="Processing">
                  Processing
                </option>
                <option name="dropdown" value="Shipped">
                Shipped
                </option>
                <option name="dropdown" value="Out for Delivery">
                Out for Delivery
                </option>
                <option name="dropdown" value="Delivered">
                  Delivered
                </option>
              </select>
              <button
                onClick={updateDetail}
                className="text-[14px] w-[100%] max-w-[100px] bg-[#197693] text-white mt-2 py-1 font-semibold rounded-lg"
              >
                Update
              </button>
            </div>
            <div>
              <h4>Shiping address</h4>
              <h5>{shippingInfo?.street},</h5>
              <h5>
                <span>{shippingInfo?.state}</span>,&nbsp;
                <span>{shippingInfo?.country}</span>,
              </h5>
              <h5>
                <span>{shippingInfo?.city}</span>-
                <span>{shippingInfo?.zipcode}</span>,
              </h5>
              <h5>Mobile No:-&nbsp;{shippingInfo?.phoneNo}</h5>
            </div>
          </div>
          <div className="border-t-[1px] border-[gray] mt-3 pt-3">
            <h4>Products Details</h4>

            <div className="flex items-center gap-x-7 border-[#197693] border-[1px] p-3 rounded-lg">
              <div className="flex items-center">
                <Image
                  src={image[0]?.includes("https://cdn.dummyjson.com/") ? Notfound : image[0]}
                  loading="lazy"
                  width={90}
                  height={90}
                  className="w-[90px] h-[90px] rounded-full"
                  alt={title}
                />
                <span>&nbsp;x&nbsp;{quantity}</span>
              </div>
              <div>
                {data?.user?.role === "Admin" && (
                  <h5 className="text-[#197693] font-semibold">
                    Seller&nbsp;:-&nbsp;{retailerId?.name}
                  </h5>
                )}
                <h5>Title&nbsp;:-&nbsp;{title}</h5>
                <h5>Price&nbsp;:-&nbsp;{price}₹</h5>
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
                  {size === "-" ? <span></span> : <span>{size}</span>}
                </h5>
              </div>
            </div>
          </div>
          <Link
            className="inline-block text-[14px] text-center w-[100px] border-[1px] border-[#197693] text-[#197693] mt-2 py-1 font-semibold rounded-lg"
            href="/User/Admin/AllOrder"
          >
            Back
          </Link>
        </div>
      )}
    </React.Fragment>
  );
};

export default Orderview;
