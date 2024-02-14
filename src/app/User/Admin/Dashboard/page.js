"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Piechart from "@/Component/Admin/Chart/Piechart";
const Dashboarddata = () => {
  const [chartstate, setChartstate] = useState([]);
  const [loading, setloading] = useState(false);
  const productionheaders = Cookies.get("__Secure-next-auth.session-token");
  const nextauthheaders = Cookies.get("next-auth.session-token");
  const cookie =
    process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/"
      ? `__Secure-next-auth.session-token=${productionheaders?.value}`
      : `next-auth.session-token=${nextauthheaders?.value}`;
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}api/admin/anylitic`, {
        headers: { Cookie: cookie }
      })
      .then((data) => setChartstate(data.data))
      .catch((e) => console.log("eee", e))
      .finally(() => setloading(false));
  }, [loading]);
  return (
    <div>
      <h3 className="text-[18px] font-bold">Statastical Information</h3>
      <Piechart chartdata={chartstate} loading={loading}/>
    </div>
  );
};

export default Dashboarddata;
