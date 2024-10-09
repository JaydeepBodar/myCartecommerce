"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Cookies from "js-cookie";
import { Globalusercontext } from "@/Context/Userproider";

const Piechart = dynamic(() => import("@/Component/Admin/Chart/Piechart"), {
  ssr: false,
});
const Dashboarddata = () => {
  const { user } = Globalusercontext();
  const [chartstate, setchartstate] = useState([]);
  const [loading, setloading] = useState(true);
  const productionheaders = Cookies.get("__Secure-next-auth.session-token");
  const nextauthheaders = Cookies.get("next-auth.session-token");
  const cookie =
    process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/"
      ? `__Secure-next-auth.session-token=${productionheaders}`
      : `next-auth.session-token=${nextauthheaders}`;
  const apidata =
  user[0]?.role === "Admin"
    ? `${process.env.API_URL}api/admin/anylitic`
    : `${process.env.API_URL}api/admin/anylitic?retailer=${user[0]?._id}`;
  useEffect(() => {
      user?.length > 0 && axios
        .get(apidata, {
          header: { Cookie: cookie },
        })
        .then((data) => setchartstate(data.data))
        .catch((e) => console.log("eee", e))
        .finally(() => setloading(false));
  }, [loading,user]);

  return (
    <div style={{ zIndex: "1" }}>
      <h3 className="text-[18px] font-bold">Statastical Information</h3>

    <Piechart chartdata={chartstate} loading={loading} />
   
    </div>
  );
};

export default Dashboarddata;
