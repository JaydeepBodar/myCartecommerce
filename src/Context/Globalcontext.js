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
        <AuthProvider>
          <Usercontextprovider>
            {children}
          </Usercontextprovider>
          </AuthProvider>
        </Cartprovider>
      </Productprovider>
    </Themeprovider>
  );
};

export default Globalcontext;
