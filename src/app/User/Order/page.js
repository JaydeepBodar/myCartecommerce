"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Order from "@/Component/Order/Order";
import queryString from "query-string";
import Cookies from "js-cookie";
// async function getData(searchParams) {
//   const urlSearch={
//     page:searchParams.page
//   }
//   const Searchquery=queryString.stringify(urlSearch)
//   const nextCookies = cookies();
//   const productionheaders = nextCookies.get("__Secure-next-auth.session-token");
//   const nextauthheaders = nextCookies.get("next-auth.session-token");
//   const cookie=  process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/"
//   ? `__Secure-next-auth.session-token=${productionheaders?.value}`
//   : `next-auth.session-token=${nextauthheaders?.value}`
//   // console.log("nextauthheaders",nextauthheaders)

//   const { data } = await axios.get(`${process.env.API_URL}api/Order/myorder?${Searchquery}`, {
//     cache: "no-store",
//     headers: {
//       Cookie:cookie
//     },
//   });
//   if (!data) {
//     // console.log("error");
//   }
//   // console.log("data.address",data?.order[0].paymentInfo)
//   // console.log("datatatataatastat",data)
//   return data;
// }
const Ordercount = ({ searchParams }) => {
  // console.log("searchParams",searchParams)
  // const orders=await getData(searchParams)
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(true);
  const productionheaders = Cookies.get("__Secure-next-auth.session-token");
  const nextauthheaders = Cookies.get("next-auth.session-token");
  const Urlsearch = {
    page: searchParams.page,
  };
  const searchQuery = queryString.stringify(Urlsearch);
  const cookie =
    process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/"
      ? `__Secure-next-auth.session-token=${productionheaders?.value}`
      : `next-auth.session-token=${nextauthheaders?.value}`;
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}api/Order/myorder?${searchQuery}`, {
        cache: "no-store",
        headers: {
          Cookie: cookie,
        },
      })
      .then((res) => setorders(res?.data))
      .catch((e) => console.log("eee", e))
      .finally(() => setloading(false));
  }, [loading, Urlsearch?.page]);
  const loader = (load) => {
    setloading(load);
  };
  console.log("ordersordersordersordersordersordersordersordersordersorders",orders)
  return (
    <Order
      order={orders?.order}
      itemperpage={orders?.productperpage}
      totalitem={orders?.productcount}
      loading={loading}
      loader={loader}
    />
  );
};

export default Ordercount;
