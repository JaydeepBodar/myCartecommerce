import React from "react";
import Image from "next/image";
import { Globalthemeprovider } from "@/Context/Themeprovider";
import Loader from "../Loader";
const Singleorder = ({ order, loading }) => {

  const {theme}=Globalthemeprovider()
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
        .delete(`${process.env.API_URL}api/Order/${_id}`, { item })
        .then((res) => toast.success(res?.data?.message))
        .catch((e) => console.log("eeee", e))
        .finally(() => router.refresh());
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
                <h4
                  className={`${
                    order?.orderStatus === "Processing"
                      ? "text-[#197693]"
                      : "text-[green]"
                  }`}
                >
                  Order Status:-&nbsp;{order?.orderStatus}
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
                <span>{order?.shippingInfo?.city}</span>-<span>{order?.shippingInfo?.zipcode}</span>,
              </h5>
              <h5>Mobile No:-&nbsp;{order?.shippingInfo?.phoneNo}</h5>
            </div>
            <div>
              <h4 className="font-semibold">Payment details</h4>
              <h5>Payment id:-&nbsp;{order?.paymentId}</h5>
              <h5>Payment Status:-&nbsp;{order?.status} </h5>
              <h5>Total payment :-&nbsp;{order?.amountPaid}₹</h5>
            </div>
          </div>
          <div
              className="flex items-center gap-x-4 gap-y-2 font-semibold p-4"
            >
              <div className="flex items-center gap-x-2 max-sm:gap-x-1 max-sm:basis-[45%]">
                <Image
                  src={order?.image[0]}
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
              <h4 className="text-[#197693] font-semibold">Seller:-&nbsp;{order?.retailerId?.name}</h4>
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
                  {order?.size === "-" ? <span></span> : <span>{order?.size}</span>}
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
