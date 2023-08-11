"use client";
import React from "react";
import Orderitems from "./Orderitems";
import Custompagination from "../Custompagination";
import Link from "next/link";
const Order = ({ itemperpage, totalitem, order }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold pb-3">Order details</h2>
      {order.length === 0 && (
        <div className="h-[50vh] flex justify-center items-center font-semibold text-xl">
          <h2>
            No order Found <Link href="/" className="font-light text-[red]">back to Shop</Link>
          </h2>
        </div>
      )}
      {order.map((item) => {
        return <Orderitems item={item} key={item._id} />;
      })}
      {order?.length !== 0 && (
        <Custompagination itemperpage={itemperpage} totalitem={totalitem} />
      )}
    </div>
  );
};

export default Order;
