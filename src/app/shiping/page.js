import Shiping from '@/Component/Cart/Shiping'
import React from 'react'
import { cookies } from 'next/headers';
import axios from 'axios';
async function getData() {
    const nextCookies = cookies();
    const productionheaders = nextCookies.get("__Secure-next-auth.session-token");
    const nextauthheaders = nextCookies.get("next-auth.session-token");
    const cookie=  process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/" || process.env.API_URL === "https://master.d2lqxmwebuu9ap.amplifyapp.com/"
    ? `__Secure-next-auth.session-token=${productionheaders?.value}`
    : `next-auth.session-token=${nextauthheaders?.value}`
    // console.log("nextauthheaders",nextauthheaders)
    const { data } = await axios.get(`${process.env.API_URL}api/Address`, {
      cache: "no-store",
      headers: {
        Cookie:cookie
      },
    });
    if (!data) {
      // console.log("error");
    }
    // console.log("data.address",data.address)
    return data.address;
  }
const shiping = async() => {
    const address = await getData();
  return <Shiping address={address}/>
}

export default shiping
