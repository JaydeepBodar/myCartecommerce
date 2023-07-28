"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const Usercontext = createContext();
const Usercontextprovider = ({ children }) => {
  const session=useSession()
  const [user, setuser] = useState();
  const router=useRouter()
  const[loading,setloading]=useState(false)
  //  console.log("user",user)
  
   const loaduser=()=>{
    setloading(true)
    // console.log("datatatattatatatatatatta")
    axios
      .get(`${process.env.API_URL}api/auth/session?update`)
      .then((res) => setuser(res.data?.user),setloading(false))
      .catch((e) => console.log("e", e))
   }
  useEffect(() => {
    loaduser()
  }, [user?.updatedAt])
  // console.log("user",user,setuser)
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
