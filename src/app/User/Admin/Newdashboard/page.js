"use client";
import React, { useEffect, useState } from "react";
import Piechart from "@/Component/Admin/Chart/Piechart";
import axios from "axios";
import Cookies from "js-cookie";
const Dashboarddata = () => {
  const [chartstate, setchartstate] = useState([]);
  const [loading, setloading] = useState(true);
  const productionheaders = Cookies.get("__Secure-next-auth.session-token");
  const nextauthheaders = Cookies.get("next-auth.session-token");
  const cookie =
    process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/"
      ? `__Secure-next-auth.session-token=${productionheaders?.value}`
      : `next-auth.session-token=${nextauthheaders?.value}`;
  const fetchData=async()=>{
    await axios
    .get(`${process.env.API_URL}api/admin/anylitic`, {
      headers: { Cookie: cookie },
    })
    .then((data) => setchartstate(data.data))
    .catch((e) => console.log("eee", e))
    .finally((e) => setloading(false));
  }
  useEffect(() => {
    fetchData()
  }, [loading]);
  
  return (
    
  
      <div>
        <h3 className="text-[18px] font-bold">Statastical Information</h3>
        <Piechart chartdata={chartstate} loading={loading} />
      </div>
  
  );
};

export default Dashboarddata
