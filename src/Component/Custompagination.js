import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Pagination from "react-js-pagination";
const Custompagination = ({ itemperpage, totalitem }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  let page = searchParams.get("page");
  page = Number(page);
  console.log("page",page)
  let urlsearch;
  const handleChange = (current) => {
    if (typeof window !== "undefined") {
      urlsearch = new URLSearchParams(window.location.search);
			console.log("urlsearch",urlsearch)
      if (urlsearch.has("page")) {
        urlsearch.set("page", current);
      } else {
        urlsearch.append("page", current);
      }
    }
    const path = "?" +urlsearch.toString();
    router.push(path);
    console.log("urlsearch", path);
  };
  return (
    <div className="py-4">
      <Pagination
        activePage={page}
        itemsCountPerPage={itemperpage}
        totalItemsCount={totalitem}
        onChange={handleChange}
        innerClass="flex justify-center"
        activeClass="bg-red-600 text-white"
        itemClass="px-2 py-[4px] border-[1px] border-[#000]"
        firstPageText={"First"}
        lastPageText={"Last"}
        nextPageText={"Next"}
        prevPageText={"Prev"}
      />
    </div>
  );
};

export default Custompagination;
