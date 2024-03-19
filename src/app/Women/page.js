"use client"
import React from 'react'
import { Globalproductcontext } from '@/Context/Productprovider';
import Commonproduct from '@/Component/Commonproduct';
const Womenpage = () => {
    const { product,loading } = Globalproductcontext();
    console.log("productproductproductproduct", product);
    const productdata = product?.products?.filter(
      (data) =>
        data?.category === "womens-bags" ||
        data?.category === "womens-watches" ||
        data?.category === "womens-bags" ||
        data?.category === "women's clothing"
    );
    console.log("productdataproductdataproductdataproductdata", productdata);
    return (
      <div>
        <Commonproduct product={productdata} loading={loading} />
      </div>
    );
}

export default Womenpage
