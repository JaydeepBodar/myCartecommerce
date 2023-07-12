'use client'
import Productlist from "@/Component/product/Productlist";
import axios from "axios";
// import { config } from "dotenv";
import React,{useState,useEffect} from "react";  
import { env } from "@/config/env";
import queryString from "query-string";
// async function getData() {
//   const data = await fetch(`${process.env.API_URL}/api/products`, {
//     cache: "no-store",
//   });
//   if (!data) {
//     console.log("error");
//   }
//   return data.json();
// }
export default function Home({searchParams}) {
  const urlParams = {
    data: searchParams.data,
    page: searchParams.page,
    category: searchParams.category,
    "price[gte]": searchParams.min,
    "price[lte]": searchParams.max,
    "ratings[gte]": searchParams.ratings,
  };

  const searchQuery =queryString.stringify(urlParams);
  console.log("searcParams",searchQuery)
  const [product, setproduct] = useState([]);
  const[loading,setloading]=useState(true)
  useEffect(() => {
    axios
    .get(`${env.APIURL}/api/products?${searchQuery}`)
    .then((res) => {
      console.log("searchquery",searchQuery)
      setproduct(res.data);
    })
    .catch((e) => console.log("e", e)).finally(()=>setloading(false))
  }, [loading,searchParams]);
  // const product = await getData();
  return <div><Productlist product={product} loading={loading} urlParams={urlParams}/></div>;
}
