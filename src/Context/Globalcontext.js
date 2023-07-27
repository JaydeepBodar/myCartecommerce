"use client";
import React from "react";
import Cartprovider from "../Context/Cartcontext";
import AuthProvider from "./AuthProvider";
import Usercontextprovider from "./Userproider";
const Globalcontext = ({ children }) => {
  return (
    <Cartprovider>
      <AuthProvider>
        <Usercontextprovider>{children}</Usercontextprovider>
      </AuthProvider>
    </Cartprovider>
  );
};

export default Globalcontext;
