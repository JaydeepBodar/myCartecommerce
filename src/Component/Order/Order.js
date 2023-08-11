"use client";
import React,{useEffect} from "react";
import Orderitems from "./Orderitems";
import Link from "next/link";
import { CartgloblContext } from "@/Context/Cartcontext";
import { useSearchParams } from 'next/navigation'
const Order = ({ order }) => {
  const {clearCart}=CartgloblContext()
  const searParams=useSearchParams()
  const OrderSuccess=searParams.get("order_success")
  useEffect(() => {
    if(OrderSuccess === "true"){
      clearCart()
    }
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-semibold pb-3">Order details</h2>
      {order.length !== 0 ? (
        <>
          {order.map((item) => {
            return <Orderitems item={item} key={item._id} />;
          })}
        </>
      ) : (
        <div className="h-[50vh] flex justify-center items-center font-semibold text-xl">
          <h2>
            No order Found{" "}
            <Link href="/" className="font-light text-[red]">
              back to Shop
            </Link>
          </h2>
        </div>
      )}
    </div>
  );
};

export default Order;
