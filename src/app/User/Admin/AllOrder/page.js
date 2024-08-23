"use client";
import React, { useState, useEffect } from "react";
import Allorder from "@/Component/Admin/Allorder";
import axios from "axios";
import queryString from "query-string";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
const Order = ({ searchParams }) => {
  const [loading, setloading] = useState(true);
  const {data}=useSession()
  const [order, setorder] = useState([]);
  const urlsearchParams = {
    page: searchParams.page,
  };
  const searchQuery = queryString.stringify(urlsearchParams);
  const productionheaders = Cookies.get("__Secure-next-auth.session-token");
  const nextauthheaders = Cookies.get("next-auth.session-token");
  const cookie =
    process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/"
      ? `__Secure-next-auth.session-token=${productionheaders?.value}`
      : `next-auth.session-token=${nextauthheaders?.value}`;
  useEffect(() => {
    const apiget=data?.user?.role==="Admin" ? `${process.env.API_URL}api/Order/Allorderdata?${searchQuery}` : `${process.env.API_URL}api/retailer/Order?${searchQuery}`
    axios
      .get(apiget, {
        headers: { Cookie: cookie },
      })
      .then((response) => setorder(response.data))
      .catch((e) => console.log("error", e))
      .finally(() => setloading(false));
  }, [loading,searchQuery]);
  const loader=(load)=>{
    setloading(load)
  }
  return <Allorder orderdata={order} loading={loading} loader={loader}/>;
};

export default Order;
