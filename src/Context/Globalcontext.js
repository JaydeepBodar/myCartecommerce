"use client";
import React from "react";
import Cartprovider from "../Context/Cartcontext";
import AuthProvider from "./AuthProvider";
const Globalcontext = ({ children }) => {
  return (
    <Cartprovider>
      <AuthProvider>{children}</AuthProvider>
    </Cartprovider>
  );
};

export default Globalcontext;
