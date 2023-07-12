'use client'
import Productdetais from "@/Component/product/Productdetais";
import React,{useState,useEffect} from "react";
import { env } from "@/config/env";
import axios from "axios";
// console.log("env.APIURL"),env.APIURL
// async function getData(id){
//     const data=await fetch(`${env.APIURL}/api/products/${id}`, { cache: "no-store" } )
//     if(!data){
//         console.log('err')
//     }
//     return data.json()
// }
export const Product =({ params }) => {
  const [singleproduct, setsingleproduct] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    axios
      .get(`${env.APIURL}/api/products/${params.id}`)
      .then((res) => setsingleproduct(res.data))
      .catch((e) => console.log("e", e))
      .finally(() => setloading(false));
  }, [loading]);
  // const singleproduct=await getData(params.id)
  return <Productdetais singleproduct={singleproduct} loading={loading}/>;
};

// export default data;
