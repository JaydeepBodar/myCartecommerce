import Adminproduct from '@/Component/Admin/Adminproduct'
import React from 'react'
import axios from 'axios';
import { cookies } from "next/dist/client/components/headers";
import queryString from 'query-string';
async function getData(searchParams) {
    const Urlsearch={
    page: searchParams.page,
    }
		const searchQuery=queryString.stringify(Urlsearch)
    const nextCookies = cookies();
    const productionheaders = nextCookies.get("__Secure-next-auth.session-token");
    const nextauthheaders = nextCookies.get("next-auth.session-token");
    const cookie=  process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/"
    ? `__Secure-next-auth.session-token=${productionheaders?.value}`
    : `next-auth.session-token=${nextauthheaders?.value}`
  const { data } =await axios.get(`${process.env.API_URL}api/admin/product?${searchQuery}`, {
    cache: "no-store",
    headers: {
      Cookie:cookie 
    }
	});
  // console.log("data",data)
  if (!data) {
    return;
    // console.log("error");
  }
  return data;
}
const Product = async({searchParams}) => {
    const product=await getData(searchParams)
  return (
    <Adminproduct product={product}/>
  )
}

export default Product
