import { CartgloblContext } from "@/Context/Cartcontext";
import React from "react";

const Totalquantityt = ({ classname }) => {
    const {cart}=CartgloblContext()
  const totalquantity = cart?.cartItems?.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  return <span className={classname}>{!totalquantity ? 0 : totalquantity}</span>;
};

export default Totalquantityt;
