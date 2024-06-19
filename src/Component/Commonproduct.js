"use client";
import Image from "next/image";
import React, { useState } from "react";
import Pagination from "react-js-pagination";
import ReactStars from "react-stars";
import Loader from "./Loader";
import Link from "next/link";
import { Globalproductcontext } from "@/Context/Productprovider";
import { usePathname } from "next/navigation";
import Productcard from "./product/Productcard";
const Commonproduct = ({ filterdata, category, releatedProductId }) => {
  const { product, loading } = Globalproductcontext();
  const[expand,setExpand]=useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const pathname = usePathname();
  const Normalproduct = product?.products?.filter((data) => {
    if (pathname === "/Specialdeal") {
      return data?.discountPercentage >= category && data?.featured === false;
    } else {
      return data?.category === category && data?.featured === false;
    }
  });
  const productmen = filterdata?.map((category) =>
    product?.products?.filter(
      (data) => data?.category === category && data?.featured === false
    )
  );
  return (
    <>
      {" "}
      {!loading ? (
        <div className="py-6">
          <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 max-sm:gap-x-2 max-sm:gap-y-2 gap-x-5 justify-center gap-y-5 pb-3">
            {Normalproduct
              ?.slice(
                pathname !== `/productdata/${releatedProductId}` && expand === false
                  ? indexOfFirstItem
                  : 0,
                pathname !== `/productdata/${releatedProductId}` && expand === false
                  ? indexOfLastItem
                  : expand === true ?indexOfLastItem :4
              )
              .map((val, index) => {
                return (
                  <Productcard product={val} key={index}/>
                );
              })}
          </div>
          {pathname !== `/productdata/${releatedProductId}` ? (
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={Normalproduct  ?.length}
              onChange={(number) => {
                setCurrentPage(number);
              }}
              innerClass="flex justify-center"
              activeClass="bg-[#197693] text-white"
              itemClass="px-2 py-[4px]"
              firstPageText={"<<"}
              lastPageText={">>"}
              nextPageText={">"}
              prevPageText={"<"}
            />
          ) : (
            <button
              onClick={()=>{
                setExpand(!expand)
              }}
              className="w-[120px] text-[#fff] mx-auto my-5 bg-[#197693] rounded-xl block text-center tracking-wide"
            >
              {!expand ? <span>Exploar All</span> : <span>Collapse All</span>}
            </button>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[90vh] max-sm:h-[70vh]">
          <Loader />
        </div>
      )}
    </>
  );
};

export default Commonproduct;
