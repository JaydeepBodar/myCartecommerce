"use client";
import React from "react";
import { GoMoveToTop } from "react-icons/go";
import { useRouter } from "next/navigation";
const Footer = () => {
  const route = useRouter();
  const date = new Date().getFullYear();
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <div className="relative">
      <div
        title="back to top"
        className="absolute right-[30px] px-2 py-1 top-[-20px] bg-red-600 cursor-pointer"
        onClick={scrollToTop}
      >
        <GoMoveToTop fill="white" className="text-xl font-bold" />
      </div>
      <div className="text-center text-base py-3 font-bold text-white bg-red-600">
        ©{date} all Copy rights are reserved @myCart
      </div>
    </div>
  );
};

export default Footer;
