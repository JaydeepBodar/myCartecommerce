"use client";
import React from "react";
import Cartprovider from "../Context/Cartcontext";
import AuthProvider from "./AuthProvider";
import Productprovider from "./Productprovider";
import Themeprovider from "./Themeprovider";
import Usercontextprovider from "./Userproider";
const Globalcontext = ({ children }) => {
  return (
    <Themeprovider>
      <Productprovider>
        <Cartprovider>
          <Usercontextprovider>
            <AuthProvider>{children}</AuthProvider>
          </Usercontextprovider>
        </Cartprovider>
      </Productprovider>
    </Themeprovider>
  );
};

export default Globalcontext;
