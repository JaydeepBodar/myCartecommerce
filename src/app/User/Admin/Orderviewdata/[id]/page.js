'use client'
import React,{useState,useEffect} from "react";
import axios from "axios";
import Orderview from "@/Component/Admin/Orderview";
import Cookies from "js-cookie";
// async function getData(id) {
//   const nextCookies = cookies();
//   const productionheaders = nextCookies.get("__Secure-next-auth.session-token");
//   const nextauthheaders = nextCookies.get("next-auth.session-token");
//   const cookie =
//     process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/"
//       ? `__Secure-next-auth.session-token=${productionheaders?.value}`
//       : `next-auth.session-token=${nextauthheaders?.value}`;
//   const { data } = await axios.get(`${process.env.API_URL}api/Order/${id}`, {
//     headers: { Cookie: cookie },
//   });
//   if (!data) {
//     console.log("data");
//   }
//   return data.order;
// }

const Overview = ({ params }) => {
  // console.log("params", params.id);
  // const order = await getData(params.id);
  const productionheaders = Cookies.get("__Secure-next-auth.session-token");
  const nextauthheaders = Cookies.get("next-auth.session-token");
  // console.log("nextauthheaders",nextauthheaders)
  const cookie =
    process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/"
      ? `__Secure-next-auth.session-token=${productionheaders?.value}`
      : `next-auth.session-token=${nextauthheaders?.value}`;
  const [order, setorder] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}api/Order/${params.id}`, {
        headers: { Cookie: cookie },
      })
      .then((res) => setorder(res.data.order))
      .catch((e) => console.log("eeeee", e))
      .finally(() => setloading(false));
  }, [loading]);
  console.log("order",order)
  return <Orderview order={order} loading={loading} />;
};

export default Overview;
