"use client";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const Usercontext = createContext();
const Usercontextprovider = ({ children }) => {
  const [user, setuser] = useState([]);
  const router=useRouter()
  const Cookiesdata=Cookies.get("next-auth.session-token")
  console.log("Cookiesdata",Cookiesdata)
  const[loading,setloading]=useState(true) 
  //  console.log("user",user)
   const loaduser=()=>{
    // console.log("dtatatat")
    // console.log("datatatattatatatatatatta")
    axios
      .get(`${process.env.API_URL}api/auth/getsingleUser`)
      .then((res) => setuser(res.data))
      .catch((e) => console.log(e)).finally(()=>setloading(false))
   }
  useEffect(() => {
    loaduser()
  }, [user?.updatedAt])
  return (
    <Usercontext.Provider value={{user ,loading,setuser,loaduser}}>
      {children}
    </Usercontext.Provider>
  );
};
export default Usercontextprovider;
export const Globalusercontext = () => {
  return useContext(Usercontext);
};
