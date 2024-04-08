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
  const pathname = usePathname();
  const [singleproduct, setsingleproduct] = useState([]);
  const [edit, setedit] = useState(false);
  // console.log("objectpathname", pathname);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    axios
      .get(`${env.APIURL}/api/products/${params.id}`)
      .then((res) => setsingleproduct(res.data))
      .catch((e) => console.log("e", e))
      .finally(() => setloading(false),setedit(false));
  }, [loading,edit,pathname]);
  const handleEditing=()=>{
    setedit(true)
  }
  // const singleproduct=await getData(params.id)
  return <Productdetais singleproduct={singleproduct} loading={loading} handleEditing={handleEditing} />;
};

export default Product;
