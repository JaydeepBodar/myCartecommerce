'use client'
import Productlist from "@/Component/product/Productlist";
import axios from "axios";
// import { config } from "dotenv";
import React,{useState,useEffect} from "react";  
import { env } from "@/config/env";
// async function getData() {
//   const data = await fetch(`${process.env.API_URL}/api/products`, {
//     cache: "no-store",
//   });
//   if (!data) {
//     console.log("error");
//   }
//   return data.json();
// }
export default function Home() {
  const [product, setproduct] = useState([]);
  const[loading,setloading]=useState(true)
  useEffect(() => {
    axios
    .get(`${env.APIURL}/api/products`)
    .then((res) => {
      setproduct(res.data);
    })
    .catch((e) => console.log("e", e)).finally(()=>setloading(false))
  }, [loading]);
  // const product = await getData();
  return <div><Productlist product={product} loading={loading}/></div>;
}
