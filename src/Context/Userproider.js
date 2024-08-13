"use client";
import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const Usercontext = createContext();
const Usercontextprovider = ({ children }) => {
  const { status } = useSession();
  const [user, setuser] = useState([]);
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const loaduser = () => {
    status === "authenticated" &&
      axios
        .get(`${process.env.API_URL}api/auth/getsingleUser`)
        .then((res) => setuser(res.data))
        .catch((e) => console.log(e))
        .finally(() => setloading(false));
  };
  useEffect(() => {
    loaduser();
  }, [user?.updatedAt, status]);
  return (
    <Usercontext.Provider value={{ user, loading, setuser, loaduser }}>
      {children}
    </Usercontext.Provider>
  );
};
export default Usercontextprovider;
export const Globalusercontext = () => {
  return useContext(Usercontext);
};
