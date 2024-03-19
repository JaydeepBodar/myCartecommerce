"use client";
import React from "react";
import Cartprovider from "../Context/Cartcontext";
import AuthProvider from "./AuthProvider";
import Productprovider from "./Productprovider";
import Usercontextprovider from "./Userproider";
const Globalcontext = ({ children }) => {
  return (
    <Productprovider>
      <Cartprovider>
        <Usercontextprovider>
          <AuthProvider>{children}</AuthProvider>
        </Usercontextprovider>
      </Cartprovider>
    </Productprovider>
  );
};

export default Globalcontext;
