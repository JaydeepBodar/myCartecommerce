"use client";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useState, useEffect, createContext, useContext } from "react";
const Productcontext = createContext();
const Productprovider = ({ children }) => {
  const [product, setproduct] = useState([]);
  const [loading, setloading] = useState(true);
  const path=usePathname()
  useEffect(() => {
    axios
      .get(`${process.env.API_URL}api/products/Allproduct`)
      .then((res) => {
        setproduct(res.data);
      })
      .catch((e) => console.log("eeee", e))
      .finally(() => setloading(false));
  }, [loading,path]);
  return (
    <Productcontext.Provider
      value={{ product, loading}}
    >
      {children}
    </Productcontext.Provider>
  );
};
export default Productprovider;
export const Globalproductcontext = () => { 
  return useContext(Productcontext);
};
