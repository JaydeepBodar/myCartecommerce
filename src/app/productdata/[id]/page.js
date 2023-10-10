"use client";
import Productdetais from "@/Component/product/Productdetais";
import React, { useState, useEffect } from "react";
import { env } from "@/config/env";
import axios from "axios";
import { usePathname } from "next/navigation";
// console.log("env.APIURL"),env.APIURL
// async function getData(id){
//     const data=await fetch(`${env.APIURL}/api/products/${id}`, { cache: "no-store" } )
//     if(!data){
//         console.log('err')
//     }
//     return data.json()
// }
const Product = ({ params }) => {
  const [singleproduct, setsingleproduct] = useState([]);
  const [edit, setedit] = useState(false);
  const pathname = usePathname();
  // console.log("objectpathname", pathname);
  const [loading, setloading] = useState(true);
  const handleEditing=()=>{
    setedit(true)
  }
  useEffect(() => {
    axios
      .get(`${env.APIURL}/api/products/${params.id}`)
      .then((res) => setsingleproduct(res.data))
      .catch((e) => console.log("e", e))
      .finally(() => setloading(false),setedit(false));
  }, [loading,edit]);
  // const singleproduct=await getData(params.id)
  return <Productdetais singleproduct={singleproduct} loading={loading} handleEditing={handleEditing} />;
};

export default Product;
