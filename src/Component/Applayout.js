"use client";
import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Globalthemeprovider } from "@/Context/Themeprovider";
const Applayout = ({ children }) => {
const{theme}=Globalthemeprovider()
  return (
    <div className={`${theme === false && "theme_changes"}`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Applayout;
