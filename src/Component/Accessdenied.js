import React from "react";
import Link from "next/link";
const Accessdenied = () => {
  return (
    <p className="flex justify-center items-center h-[81.7vh] max-md:h-[76vh] max-md:lg text-2xl font-semibold">
      <span className="text-center">
        Access Denied First you need to login to Access This page&nbsp;
        <Link
          href="/login"
          className="text-[#197693] decoration-slice font-semibold"
        >
          Log in...
        </Link>
      </span>
    </p>
  );
};

export default Accessdenied;
