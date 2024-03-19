"use client"
import React from 'react'
import { Globalproductcontext } from '@/Context/Productprovider';
import Commonproduct from '@/Component/Commonproduct';
const Womenpage = () => {
    const { product,loading } = Globalproductcontext();
    const productdata = product?.products?.filter(
      (data) =>
        data?.category === "electronics"
    );
    return (
      <div>
        <Commonproduct product={productdata} loading={loading} />
      </div>
    );
}

export default Womenpage
