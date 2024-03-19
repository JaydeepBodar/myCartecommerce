"use client";
import Image from "next/image";
import React, { useState } from "react";
import Pagination from "react-js-pagination";
import ReactStars from "react-stars";
import Container from "./Container";
import Loader from "./Loader";
import Link from "next/link";
const Commonproduct = ({ product,loading }) => {
  console.log("productproductproduct", product);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  return (
    <>
      {" "}
      <Container>
        {!loading ? (
          <>
            <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-x-5 justify-center gap-y-5">
              {product
                ?.slice(indexOfFirstItem, indexOfLastItem)
                .map((val, index) => {
                  const {
                    _id,
                    thumbnail,
                    title,
                    price,
                    rating,
                    stock,
                    discountPercentage,
                  } = val;
                  const withDiscount =
                    price - ((price * discountPercentage) / 100).toFixed(0);
                  return (
                    <Link
                      href={`/productdata/${_id}`}
                      key={index}
                      className=" border-[1px] border-[#cecbcb] rounded-lg"
                    >
                      <div className="w-[100%] h-[250px] overflow-hidden">
                        <Image
                          src={thumbnail}
                          className="object-cover w-[100%] h-[100%]"
                          width={200}
                          height={200}
                        />
                      </div>
                      <div className="pt-4 px-3">
                        <h3 className="font-semibold text-lg max-sm:text-base capitalize">
                          {title}
                        </h3>
                        <div>
                          <ReactStars
                            edit={false}
                            count={5}
                            size={24}
                            value={rating}
                            color2={"#ffd700"}
                          />
                          <del className="text-[gray]">{price}₹</del>
                          <span className="text-[green] pl-3">
                            {withDiscount}₹
                          </span>
                          <h4
                            className={`${
                              stock === "InStock"
                                ? "text-[green]"
                                : "text-[red]"
                            }`}
                          >
                            {stock}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
            <div className="py-6">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={product?.length}
                onChange={(number) => {
                  setCurrentPage(number);
                }}
                innerClass="flex justify-center"
                activeClass="bg-red-600 text-white"
                itemClass="px-2 py-[4px] border-[1px] border-[#000]"
                firstPageText={"First"}
                lastPageText={"Last"}
                nextPageText={"Next"}
                prevPageText={"Prev"}
              />
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-[90vh] max-sm:h-[70vh]">
            <Loader />
          </div>
        )}
      </Container>
    </>
  );
};

export default Commonproduct;
