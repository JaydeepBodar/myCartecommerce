"use client";
import React, { useState } from "react";
import Container from "../Container";
import { AiOutlineCaretDown } from "react-icons/ai";
import Filter from "./Filter";
import Custompagination from "../Custompagination";
import Loader from "../Loader";
import Item from "./Item";

const Productlist = ({ product, loading,loader }) => {
  const [open, setopen] = useState(false);
  const toogle = () => {
    setopen((prev) => !prev);
  };
  return (
    <Container>
      <div className="max-sm:block sm:hidden relative">
        <div className="absolute left-[220px] top-3">
          <AiOutlineCaretDown className="text-[#000]"/>
        </div>
        <button
          className={`text-[#000000] border-[#f2f2f2] border-[1px] w-[100%] max-w-[250px] bg-[#f2f2f2] text-left px-3 py-2 rounded-lg mb-3`}
          onClick={toogle}
        >
          Filter product
        </button>
      </div>
      <div
        className="flex gap-x-3 max-lg:flex-row max-lg:flex-wrap"
        style={{ alignItems: loading ? "center" : "" }}
      >
        <div
          className={`${
            open === true ? "max-sm:block" : "max-sm:hidden"
          } basis-[20%] max-lg:basis-[100%] max-lg:flex`}
        >
          <Filter />
        </div>
        <div className="basis-[80%] max-lg:basis-[100%]">
          {loading && (
            <div className="flex justify-center items-center h-[140vh] max-sm:h-[80vh]">
              <Loader />
            </div>
          )}
          {!loading && product.products?.length === 0 && (
            <div className="flex justify-center items-center h-[140vh] max-sm:h-[80vh]">
              <h4 className="text-3xl max-sm:text-2xl font-bold">
                No product Found For Your Filter...
              </h4>
            </div>
          )}
          {!loading && product?.products?.length > 0 && product?.products?.map((product, index) => {
            return <Item key={index} product={product} loading={loading} />;
          })}
        </div>
      </div>
      {!loading && product.products?.length !== 0 && (
        <Custompagination
          totalitem={product.filterproductscount}
          itemperpage={product.productperpage}
          loader={loader}
        />
      )}
    </Container>
  );
};

export default Productlist;
