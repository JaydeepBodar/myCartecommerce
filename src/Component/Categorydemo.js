"use client";
import React, { useState, useEffect } from "react";
import Container from "./Container";
import Link from "next/link";
import Image from "next/image";
import ReactStars from "react-stars";
import Loader from "./Loader";
import Breadcrumb from "./Breadcrumb";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import { Globalthemeprovider } from "@/Context/Themeprovider";
import Pagination from "react-js-pagination";
import { IoMenuOutline } from "react-icons/io5";
import { FaGripLinesVertical } from "react-icons/fa";
import { IoRemoveOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Commonproduct from "./Commonproduct";
import Productcard from "./product/Productcard";
const Categorydemo = ({
  singleproduct,
  setsubcategory,
  subcategory,
  price,
  categorydata,
  loading,
  category,
  // hanleMaxrange,
  // hanleMinrange,
  maxValue,
  minValue,
  // priceMin,
  // priceMax,
  setprices,
  handleSliderChange,
  loading1,
  setloading1
}) => {
  const { theme } = Globalthemeprovider();
  const [grid, setgrid] = useState(window.innerWidth <= 768 ? 2 : 3);
  const [currentPage, setCurrentPage] = useState(1);
  const [width, setwidth] = useState(window.innerWidth);
  const pathname = usePathname();
  const itemsPerPage = grid === 1 ? 4 : 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const gridarray = [
    { icon: <IoMenuOutline />, number: 3 },
    { icon: <FaGripLinesVertical />, number: 2 },
    { icon: <IoRemoveOutline />, number: 1 },
  ];
  const categoryfield = [
    ...new Set(categorydata?.map((val) => val?.subcategory)),
  ];
  useEffect(() => {
    setCurrentPage(1);
  }, [subcategory, price]);
  useEffect(() => {
    const handleResize = () => {
      setwidth(window.innerWidth);
      if (width <= 768) {
        setgrid(2);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  return (
    <section className="product_category py-5">
      <Breadcrumb title={category} />
      <Container>
        {!loading ? (
          <>
            <div
              className={`${
                singleproduct.length === 0 && "justify-between"
              } flex gap-x-2 h-[auto] max-md:flex-col gap-y-3`}
            >
              <div className="w-[100%] max-w-[250px] max-md:w-[100%] max-md:max-w-[100%]">
                {/* <div className="price-range-progress-container">
                <div
                  className="price-range-progress-bar"
                  style={{
                    width: `${maxPercentage - minPercentage}%`,
                    marginLeft: `${minPercentage}%`,
                  }}
                ></div>
                <div className="price-range-inputs">
                  <input
                    placeholder="max"
                    type="number"
                    value={priceMin}
                    min={minValue}
                    max={priceMax}
                    onChange={(e) => hanleMinrange(e)}
                  />
                  <input
                    placeholder="min"
                    type="number"
                    value={priceMax}
                    min={priceMin}
                    max={maxValue}
                    onChange={(e) => hanleMaxrange(e)}
                  />
                </div>
              </div> */}
                <div className="border-[1px] border-[#cecbcb] h-[auto] px-4 py-3 max-md:border-none rounded-lg">
                  <div className="pb-6 input_range_price">
                    <InputRange
                      maxValue={maxValue}
                      minValue={minValue}
                      value={price}
                      onChange={(e) => handleSliderChange(e)}
                    />
                  </div>
                  <ul className="flex gap-x-5 max-sm:gap-x-1 max-sm:gap-y-2 max-sm:text-[14px] pb-2 flex-col gap-y-4 text-center max-md:flex-row max-md:flex-wrap">
                    <li
                      className={`${
                        subcategory === "" && "bg-[#197693] text-[#fff]"
                      } ${
                        theme === false ? "text-[#fff]" : "text-[#000]"
                      } capitalize cursor-pointer max-sm:px-2 px-5 py-1 font-semibold rounded-lg transtiton-all duration-500`}
                      onClick={() => {
                        setsubcategory("");
                        setprices({ min: "", max: "" });
                        setloading1(true)
                      }}
                    >
                      All
                    </li>
                    {categoryfield?.map((data, index) => {
                      return (
                        <li
                          key={index}
                          className={`${
                            data === subcategory && "bg-[#197693] text-[#fff]"
                          } ${
                            theme === false && "text-[#fff]"
                          } capitalize cursor-pointer max-sm:px-2 px-5 py-1 font-semibold text-[#000] rounded-lg transtiton-all duration-500`}
                          onClick={() => {
                            setsubcategory(data);
                            setprices({ min: "", max: "" });
                            setloading1(true)
                          }}
                        >
                          {data}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {loading1 === true ? (
                <div className="flex justify-center items-center h-[70vh] max-sm:h-[40vh] mx-[auto]">
                  <Loader />
                </div>
              ) : singleproduct.length > 0 ? (
                <div className="flex flex-col gap-y-4 w-[100%]">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-2xl max-md:text-lg capitalize">
                      {subcategory === "" ? <span>All</span> : subcategory}
                    </h3>
                    <ul className="flex gap-x-3">
                      {gridarray.map((gridval, index) => {
                        const { icon, number } = gridval;
                        return (
                          <li
                            key={index}
                            className={`cursor-pointer rounded-lg text-[20px] ${
                              index === 0 && "max-sm:hidden"
                            } ${
                              grid === number && "bg-[#197693] text-white"
                            } font-bold p-2 max-sm:p-1`}
                            onClick={() => setgrid(number)}
                          >
                            {icon}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div
                    className={`grid grid-cols-${grid} max-md:grid-cols-${grid} max-sm:gap-x-2 max-sm:gap-y-2 gap-x-5 gap-y-5 ${
                      grid === 2 && "sm:px-[100px]"
                    } ${grid === 1 && "sm:px-[75px]"}`}
                  >
                    {singleproduct
                      ?.slice(indexOfFirstItem, indexOfLastItem)
                      .map((val, index) => {
                        return (
                          <Productcard product={val} key={index} grid={grid} />
                        );
                      })}
                  </div>
                </div>
              ) : (
                loading1 === false && (
                  <div className="flex justify-center items-center h-[50vh] max-sm:text-center mx-[auto]">
                    <h4 className="text-3xl max-sm:text-2xl font-bold">
                      No product Found For Your Filter...
                    </h4>
                  </div>
                )
              )}
            </div>
            <div className="py-6">
              {singleproduct?.length >= itemsPerPage && (
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={itemsPerPage}
                  totalItemsCount={singleproduct?.length}
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
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-[90vh] max-sm:h-[70vh]">
            <Loader />
          </div>
        )}
      </Container>
    </section>
  );
};

export default Categorydemo;
