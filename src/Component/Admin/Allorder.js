"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Tostify from "../Tostify";
import Loader from "../Loader";
import Custompagination from "../Custompagination";
const Allorder = ({ orderdata, loading,loader }) => {
  const { order, productcount, productperpage } = orderdata;
  const router = useRouter();
// useEffect(() => {
//     // console.log("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
//     router.refresh();
//   }, [productperpage,productcount]);  
  return (
    <section>
      <Tostify />
      {loading && (
        <div className="h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && (
        <React.Fragment>
          <div className="allorder flex flex-wrap gap-y-3">
            {order?.map((item) => {
              const { paymentInfo, _id, orderStatus, createdAt } = item;
              const month = new Date(createdAt).toLocaleString("en-us", {
                month: "short",
              });
              const day = new Date(createdAt).getDate();
              const year = new Date(createdAt).getFullYear();
              return (
                <div
                  key={_id}
                  className="flex text-[15px] leading-6 flex-wrap justify-between w-[100%] bg-[#f2f2f2] p-5 rounded-lg max-sm:gap-y-4"
                >
                  <div>
                    <h4><span>Order Id</span>&nbsp;:-&nbsp;{_id}</h4>
                    <h4><span>Payment Id</span>&nbsp;:-&nbsp;{paymentInfo?.id}</h4>
                    <h4><span>Order Created</span>&nbsp;:-&nbsp;{day}&nbsp;{month}&nbsp;{year}</h4>
                  </div>
                  <div>
                    <Link
                      className="block w-[100px] py-2 text-center rounded-lg bg-blue-600 text-white font-semibold tracking-wide"
                      href={`/User/Admin/Orderviewdata/${_id}`}
                    >
                      View Order
                    </Link>
                  </div>
                  <div>
                    <h4
                      className={`${
                        orderStatus === "Processing"
                          ? "text-[red]"
                          : "text-[green]"
                      }`}
                    >
                      <span>Order Status</span>&nbsp;:-&nbsp;{orderStatus}
                    </h4>
                    <h4><span>Payment Status</span>&nbsp;:-&nbsp;{paymentInfo?.status}</h4>
                  </div>
                </div>
              );
            })}
          </div>
          <Custompagination
            totalitem={productcount}
            itemperpage={productperpage}
            loader={loader}
          />
        </React.Fragment>
      )}
    </section>
  );
};

export default Allorder;
