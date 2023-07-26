import Singleaddress from "@/Component/User/Address/Singleaddress";
import axios from "axios";
import React from "react";
import { cookies } from "next/dist/client/components/headers";
async function getData(id) {
    const nextCookies = cookies();
    const productionheaders = nextCookies.get("__Secure-next-auth.session-token");
    const nextauthheaders = nextCookies.get("next-auth.session-token");
    const cookie=  process.env.API_URL === "https://my-cartecommerce.vercel.app/"
    ? `__Secure-next-auth.session-token=${productionheaders?.value}`
    : `next-auth.session-token=${nextauthheaders?.value}`
  const { data } =await axios.get(`${process.env.API_URL}api/Address/${id}`, {
    cache: "no-store",
    headers: {
      Cookie:cookie 
    }
	});
  // console.log("data",data)
  if (!data) {
    console.log("error");
  }
  return data.address;
}
const indivisual = async ({ params }) => {
    const address = await getData(params.id);
    // console.log("first",address.address)
  return <Singleaddress addressdata={address} />;
};

export default indivisual;
