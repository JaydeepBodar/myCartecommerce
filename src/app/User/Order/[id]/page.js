"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Singleorder from "@/Component/Order/Singleorder";
import Cookies from "js-cookie";
const Singleorderpage = ({ params }) => {
  const [orders, setorders] = useState([]);
  const [loading, setloading] = useState(true);
  const productionheaders = Cookies.get("__Secure-next-auth.session-token");
  const nextauthheaders = Cookies.get("next-auth.session-token");
  const cookie =
    process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/" || process.env.API_URL === "https://master.d2lqxmwebuu9ap.amplifyapp.com/"
      ? `__Secure-next-auth.session-token=${productionheaders?.value}`
      : `next-auth.session-token=${nextauthheaders?.value}`;
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}api/Order/myorder/${params.id}`, {
        headers: {
          Cookie: cookie,
        },
      })
      .then((res) => 
         setorders(res?.data)
      )
      .catch((e) => console.log("eee", e))
      .finally(() => setloading(false));
  }, [loading]);
  return <Singleorder order={orders?.order} loading={loading} />;
};

export default Singleorderpage;
