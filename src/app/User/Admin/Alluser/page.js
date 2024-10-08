'use client'
import React,{useState,useEffect} from "react";
import Alluser from "@/Component/Admin/Alluser";
import Cookies from "js-cookie";
import axios from "axios";
import queryString from "query-string";
const Alluserdata = ({searchParams}) => {
    const [loading, setloading] = useState(true);

    const [user, setuser] = useState([]);
    const urlsearchParams = {
      page: searchParams.page,
    };
    const searchQuery = queryString.stringify(urlsearchParams);
    const productionheaders = Cookies.get("__Secure-next-auth.session-token");
    const nextauthheaders = Cookies.get("next-auth.session-token");
    const cookie =
      process.env.API_URL === "https://my-cartecommerce-ljdm.vercel.app/"
        ? `__Secure-next-auth.session-token=${productionheaders}`
        : `next-auth.session-token=${nextauthheaders}`;
    useEffect(() => {
      axios
        .get(`${process.env.API_URL}api/admin/Alluser?${searchQuery}`, {
          header: { Cookie: cookie },
        })
        .then((response) => setuser(response.data))
        .catch((e) => console.log("error", e))
        .finally(() => setloading(false));
    }, [loading]);
    const loader=(load)=>{
      setloading(load)
    }
  
  return <Alluser user={user?.allUser} loader={loader} totalitem={user?.totaluser} userperpage={user?.userperPage} loading={loading}/>
}

export default Alluserdata
