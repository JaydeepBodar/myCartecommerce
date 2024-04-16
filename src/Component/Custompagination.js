"use client"
import { Globalthemeprovider } from "@/Context/Themeprovider";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Pagination from "react-js-pagination";
const Custompagination = ({ itemperpage, totalitem ,loader}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const{theme}=Globalthemeprovider()
  let page = searchParams.get("page");
  page = Number(page);
  // console.log("page", page);
  let urlsearch;
  const handleChange = (current) => {
    loader(true)
    if (typeof window !== "undefined") {
      urlsearch = new URLSearchParams(window.location.search);
      // console.log("urlsearch", urlsearch);
      if (urlsearch.has("page")) {
        urlsearch.set("page", current);
      } else {
        urlsearch.append("page", current);
      }
    }
    const path = "?" + urlsearch.toString();
    router.push(path);
    // console.log("urlsearch", path);  0
  };
  return (
    <div className="py-4">
      {totalitem >= itemperpage && (
        <Pagination
          activePage={page}
          itemsCountPerPage={itemperpage}
          totalItemsCount={totalitem}
          onChange={handleChange}
          innerClass="flex justify-center"
          activeClass="bg-[#197693] text-white"
          itemClass={`${theme === true ? "border-[#000]" : "border-[#fff]"} px-2 py-[4px] border-[1px]`}
          firstPageText={"First"}
          lastPageText={"Last"}
          nextPageText={"Next"}
          prevPageText={"Prev"}
        />
      )}
    </div>
  );
};

export default Custompagination;
