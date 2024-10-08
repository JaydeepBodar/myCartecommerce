"use client";
import React from "react";
import Image from "next/image";
import { Globalthemeprovider } from "@/Context/Themeprovider";
import Loader from "../Loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import Notfound from "../../../public/images/Noimage.jpg"

const Singleorder = ({ order, loading }) => {
  // console.log("orderorderorderorder", order);
  const router = useRouter();
  const { theme } = Globalthemeprovider();
  const month = new Date(order?.createdAt).toLocaleString("en-us", {
    month: "short",
  });
  const day = new Date(order?.createdAt).getDate();
  const year = new Date(order?.createdAt).getFullYear();
  const deleteOrderitem = () => {
    let text =
      "if you really want to delete your order ? if yes then press ok otherwise press cancle";
    if (window.confirm(text) == true) {
      axios
        .delete(`${process.env.API_URL}api/Order/${order?._id}`, { order })
        .then((res) => toast.success(res?.data?.message))
        .catch((e) => console.log("eeee", e))
        .finally(() => router.push("/User/Order"));
    }
  };
  const orderStatusdata = (orderStatus) => {
    switch (orderStatus) {
      case "Processing":
        return { height: "0px", color: "#e62626" };
      case "Shipped":
        return { height: "80px", color: "#dba81a" };
      case "Out for Delivery":
        return { height: "160px", color: "#1369b8" };
      case "Delivered":
        return { height: "250px", color: "#008000" };
      default:
        return null;
    }
  };
  return (
    <>
      {!loading ? (
        <div className="border-[1px] border-[#cecbcb] rounded-lg px-4 py-5 mb-2 text-[14px] max-sm:text-[13px] leading-[22px]">
          <div className="mb-2 border-b-[1px] border-[#cecbcb]">
            <h3 className="text-lg font-semibold">Order-summury</h3>
            <div className="flex justify-between flex-wrap items-start">
              <div>
                {" "}
                <h4>Order id:-&nbsp;{order?._id}</h4>
                <h4 className="text-base font-semibold">Order tracking</h4>
                <p className="h-[250px] text-left border-l-[2px] border-[#cecbcb] relative my-6 order_track">
                  <span
                    className={`${
                      order?.orderStatus === "Processing"
                        ? "animation_class"
                        : ""
                    } ${
                      order?.orderStatus !== "Processing"
                        ? "without_animation_data"
                        : ""
                    } without_animation absolute top-[-10px] left-3`}
                  >
                    {order?.orderStatus === "Processing"
                      ? order?.orderStatus
                      : "Processing"}
                  </span>
                  <span
                    className={`${
                      order?.orderStatus === "Shipped" ? "animation_class" : ""
                    }  ${
                      order?.orderStatus === "Out for Delivery" ||
                      order?.orderStatus === "Delivered"
                        ? "without_animation_data"
                        : ""
                    } absolute top-[31%] left-3 without_animation`}
                  >
                    {order?.orderStatus === "Shipped"
                      ? order?.orderStatus
                      : "Shipped"}
                  </span>
                  <span
                    className={`${
                      order?.orderStatus === "Out for Delivery"
                        ? "animation_class"
                        : ""
                    }  ${
                      order?.orderStatus === "Delivered"
                        ? "without_animation_data"
                        : ""
                    } absolute top-[63%] left-3 without_animation`}
                  >
                    {order?.orderStatus === "Out for Delivery"
                      ? order?.orderStatus
                      : "Out for Delivery"}
                  </span>
                  <span
                    className={`${
                      order?.orderStatus === "Delivered"
                        ? "animation_class"
                        : ""
                    } absolute top-[93%] left-3 without_animation`}
                  >
                    {order?.orderStatus === "Delivered"
                      ? order?.orderStatus
                      : "Delivered"}
                  </span>
                  <span
                    className="text-left border-l-[2px] border-[#197693] absolute left-[-1px]"
                    style={{
                      maxHeight: orderStatusdata(order?.orderStatus).height,
                      transition: "height 2s ease",
                      height: "100%",
                    }}
                  ></span>
                </p>
                <h4
                >
                  Order Status:-&nbsp;<span style={{ color: orderStatusdata(order?.orderStatus).color}}>{order?.orderStatus}</span>
                </h4>
              </div>
              <h4>
                Ordered date:-&nbsp;{day}-{month}-{year}
              </h4>
            </div>
          </div>
          <div className="flex justify-between items-start flex-wrap p-2 border-b-[1px] border-[#cecbcb]">
            <div>
              <h4 className="font-semibold">User details</h4>
              <h5>{order?.user?.name}</h5>
              <h5>{order?.user?.email}</h5>
            </div>
            <div>
              <h4 className="font-semibold">Shiping address</h4>
              <h5>{order?.shippingInfo?.street},</h5>
              <h5>
                <span>{order?.shippingInfo?.state}</span>,&nbsp;
                <span>{order?.shippingInfo?.country}</span>,
              </h5>
              <h5>
                <span>{order?.shippingInfo?.city}</span>-
                <span>{order?.shippingInfo?.zipcode}</span>,
              </h5>
              <h5>Mobile No:-&nbsp;{order?.shippingInfo?.phoneNo}</h5>
            </div>
            <div>
              <h4 className="font-semibold">Payment details</h4>
              <h5>Payment id:-&nbsp;{order?.paymentId}</h5>
              <h5>Payment Status:-&nbsp;{order?.status} </h5>
              <h5>
                Total payment :-&nbsp;{order?.amountPaid * order?.quantity}₹
              </h5>
            </div>
          </div>
          <div className="flex items-center gap-x-4 gap-y-2 font-semibold p-4">
            <div className="flex items-center gap-x-2 max-sm:gap-x-1 max-sm:basis-[45%]">
              <Image
                src={order?.image[0]?.includes("https://cdn.dummyjson.com/") ? Notfound : order?.image[0]}
                width={80}
                alt={order?.name}
                height={80}
                loading="lazy"
                className="border-[1px] border-[#cecbcb] object-fill rounded-lg w-[80px] h-[80px] "
              />
              <p className="flex">
                <span>x&nbsp;</span> {order?.quantity}
              </p>
            </div>
            <div>
              <h4 className="text-[#197693] font-semibold">
                Seller:-&nbsp;{order?.retailerId?.name}
              </h4>
              <h5>Product:-&nbsp;{order?.name}</h5>
              <h4>Price:-&nbsp;{order?.price}₹</h4>
              <h5 className="flex items-center gap-x-2">
                {order?.color?.length > 0 && (
                  <div
                    className={`${
                      theme === true ? "border-[#000000]" : "border-[#f2f2f2]"
                    } p-[2px] rounded-full border-[1px]`}
                  >
                    <span
                      style={{ backgroundColor: order?.color }}
                      className="w-[10px] h-[10px] rounded-full block"
                    ></span>
                  </div>
                )}
                {order?.size === "-" ? (
                  <span></span>
                ) : (
                  <span>{order?.size}</span>
                )}
              </h5>
            </div>
          </div>
          {order?.orderStatus === "Delivered" ? (
            ""
          ) : (
            <div className="text-right pt-2" onClick={deleteOrderitem}>
              <button className="w-[100%] font-semibold tracking-wide text-center max-w-[80px] text-[14px] py-1 rounded-lg border-[1px] border-[#197693] text-[#197693] hover:bg-[#197693] hover:text-[#fff] hover:transition-all hover:duration-1000">
                Cancel
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Singleorder;
