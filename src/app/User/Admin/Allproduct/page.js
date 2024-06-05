"use client";
import Adminproduct from "@/Component/Admin/Adminproduct";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import queryString from "query-string";
import { useSession } from "next-auth/react";
// async function getData(searchParams) {
//     const Urlsearch={
//     page: searchParams.page,
//     }
// 		const searchQuery=queryString.stringify(Urlsearch)
//     const nextCookies = cookies();
//     const productionheaders = nextCookies.get("__Secure-next-auth.session-token");
//     const nextauthheaders = nextCookies.get("next-auth.session-token");
//     const cookie=  process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/"
//     ? `__Secure-next-auth.session-token=${productionheaders?.value}`
//     : `next-auth.session-token=${nextauthheaders?.value}`
//   const { data } =await axios.get(`${process.env.API_URL}api/admin/product?${searchQuery}`, {
//     cache: "no-store",
//     headers: {
//       Cookie:cookie
//     }
// 	});
// console.log("data",data)
//   if (!data) {
//     return;
//     // console.log("error");
//   }
//   return data;
// }
const Product = ({ searchParams }) => {
  // const product=await getData(searchParams)
  const { data } = useSession();
  const [loading, setloading] = useState(true);
  const [product, setproduct] = useState([]);
  const Urlsearch = {
    page: searchParams.page,
  };
  const searchQuery = queryString.stringify(Urlsearch);
  const productionheaders = Cookies.get("__Secure-next-auth.session-token");
  const nextauthheaders = Cookies.get("next-auth.session-token");
  const cookie =
    process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/"
      ? `__Secure-next-auth.session-token=${productionheaders?.value}`
      : `next-auth.session-token=${nextauthheaders?.value}`;
  useEffect(() => {
    const apifetch =
      data?.user?.role === "Admin"
        ? `${process.env.API_URL}api/admin/product?${searchQuery}`
        : `${process.env.API_URL}api/retailer/product`;
    axios
      .get(apifetch, {
        cache: "no-store",
        headers: {
          Cookie: cookie,
        },
      })
      .then((res) => setproduct(res?.data))
      .catch((e) => console.log("eeeee", e))
      .finally(() => setloading(false));
  }, [loading, Urlsearch?.page]);
  const loader = (load) => {
    setloading(load);
  };
  return <Adminproduct product={product} loader={loader} loading={loading} />;
};

export default Product;
