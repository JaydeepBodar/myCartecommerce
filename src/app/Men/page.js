"use client";
import React from "react";
import Commonproduct from "@/Component/Commonproduct";
import { Globalproductcontext } from "@/Context/Productprovider";
const Manpage = () => {
  const { product, loading } = Globalproductcontext();
  const productdata = product?.products?.filter(
    (data) =>
      data.category === "mens-shoes" ||
      data.category === "mens-watches" ||
      data?.category === "men's clothing" ||
      data?.category === "sunglasses"
  );
  return (
    <div>
      <Commonproduct product={productdata} loading={loading} />
    </div>
  );
};

export default Manpage;
