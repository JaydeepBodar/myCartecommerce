"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState, useEffect } from "react";
const Usercontext = createContext();
const Usercontextprovider = ({ children }) => {
  const [user, setuser] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}api/auth/session?update`)
      .then((res) => setuser(res.data?.user))
      .catch((e) => console.log("e", e))
  }, [user])
  return (
    <Usercontext.Provider value={{user}}>
      {children}
    </Usercontext.Provider>
  );
};
export default Usercontextprovider;
export const Globalusercontext = () => {
  return useContext(Usercontext);
};
