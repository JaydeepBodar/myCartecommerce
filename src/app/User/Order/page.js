import React from 'react'
import { cookies } from "next/headers";
import axios from "axios";
import Order from '@/Component/Order/Order';
import queryString from 'query-string';
async function getData() {
  const nextCookies = cookies();
  const productionheaders = nextCookies.get("__Secure-next-auth.session-token");
  const nextauthheaders = nextCookies.get("next-auth.session-token");
  const cookie=  process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/"
  ? `__Secure-next-auth.session-token=${productionheaders?.value}`
  : `next-auth.session-token=${nextauthheaders?.value}`
  // console.log("nextauthheaders",nextauthheaders)

  const { data } = await axios.get(`${process.env.API_URL}api/Order/myorder`, {
    cache: "no-store",
    headers: {
      Cookie:cookie
    },
  });
  if (!data) { 
    console.log("error");
  }
  // console.log("data.address",data?.order[0].paymentInfo)
  console.log("datatatataatastat",data)
  return data;
}
const Ordercount = async() => {
  const orders=await getData()
  return (
    <Order order={orders.order} />
  )
}

export default Ordercount
