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
                          }}
                        >
                          {data}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              {singleproduct.length > 0 ? (
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
                        const {
                          _id,
                          thumbnail,
                          title,
                          price,
                          rating,
                          stock,
                          discountPercentage,
                          retailer,
                        } = val;
                        const withDiscount =
                          price -
                          ((price * discountPercentage) / 100).toFixed(0);
                        return (
                          <Link
                            href={`/productdata/${_id}`}
                            key={index}
                            className={`border-[1px] img-hover rounded-lg overflow-hidden h-[100%] ${
                              grid === 1 ? "flex gap-x-3" : "flex flex-col"
                            }`}
                          >
                            <div className="relative">
                              <div
                                className={`h-[250px] max-sm:h-[180px] overflow-hidden flex-1`}
                              >
                                <Image
                                  src={thumbnail}
                                  className={`${
                                    grid === 1 ? "" : "w-[100%]"
                                  } object-fill h-[100%] hover-img`}
                                  width={200}
                                  height={200}
                                />
                              </div>
                              {retailer?.name?.length > 0 && rating >= 4 && (
                                <h4 className="absolute left-0 top-3 uppercase img_clip text-[14px] max-sm:text-[8px] py-[2px] max-sm:px-1 max-sm:leading-4 rounded-tr-lg rounded-br-lg px-2 tracking-wide text-[#f2f2f2] font-extrabold bg-red-500">
                                  bestseller
                                </h4>
                              )}
                            </div>
                            <div className="pt-4 px-3 flex-1 w-[100%] flex flex-col h-[100%] justify-between">
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
                                <h4 className="text-[green] font-medium">
                                  {discountPercentage}% OFF
                                </h4>
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
                                  {stock === "InStock" ? (
                                    <span>{stock}</span>
                                  ) : (
                                    <span className="text-red-600">
                                      Out of Stock
                                    </span>
                                  )}
                                </h4>
                                {retailer?.name?.length > 0 && (
                                  <h4 className="capitalize text-[#197693]">
                                    seller:-{retailer?.name}
                                  </h4>
                                )}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center h-[50vh] max-sm:text-center mx-[auto]">
                  <h4 className="text-3xl max-sm:text-2xl font-bold">
                    No product Found For Your Filter...
                  </h4>
                </div>
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
