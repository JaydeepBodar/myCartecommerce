"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
const Piechart = dynamic(() => import("@/Component/Admin/Chart/Piechart"), {
  ssr: false,
});
const Dashboarddata = () => {
  const { data } = useSession();
  const [chartstate, setchartstate] = useState([]);
  const [loading, setloading] = useState(true);
  const productionheaders = Cookies.get("__Secure-next-auth.session-token");
  const nextauthheaders = Cookies.get("next-auth.session-token");
  const cookie =
    process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/"
      ? `__Secure-next-auth.session-token=${productionheaders?.value}`
      : `next-auth.session-token=${nextauthheaders?.value}`;

  useEffect(() => {
    const apidata =
      data?.user?.role === "Admin"
        ? `${process.env.API_URL}api/admin/anylitic`
        : `${process.env.API_URL}api/admin/anylitic?retailer=${data?.user?._id}`;
    axios
      .get(apidata, {
        headers: { Cookie: cookie },
      })
      .then((data) => setchartstate(data.data))
      .catch((e) => console.log("eee", e))
      .finally((e) => setloading(false));
  },[loading]);

  return (
    <div style={{ zIndex: "1" }}>
      <h3 className="text-[18px] font-bold">Statastical Information</h3>
      <Piechart chartdata={chartstate} loading={loading} />
    </div>
  );
};

export default Dashboarddata;
