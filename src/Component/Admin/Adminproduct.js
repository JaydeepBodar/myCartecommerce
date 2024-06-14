"use client";
import React, { useState } from "react";
import Image from "next/image";
import Pagination from "react-js-pagination";
import Link from "next/link";
import Custompagination from "../Custompagination";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { Globalthemeprovider } from "@/Context/Themeprovider";
import { Globalproductcontext } from "@/Context/Productprovider";
const Adminproduct = ({
  product,
  loader,
  loading,
  setcategory,
  category,
  role,
}) => {
  const { products } = product;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const { theme } = Globalthemeprovider();
  const { product: categorydata } = Globalproductcontext();
  // console.log("productsproducts", products);
  const uniqueCategory = Array.from(
    new Set(categorydata?.products?.map((product) => product.category))
  );
  const router = useRouter();
  const deleteProduct = (id, val) => {
    // console.log("id", id);
    // console.log("product", product);
    let text =
      "if you really want to product remove product from the product list ? if yes then press ok otherwise press cancle";
    if (window.confirm(text) == true) {
      axios
        .delete(`${process.env.API_URL}api/admin/product/${id}`, val)
        .then((res) => toast.success(res.data.message))
        .catch((e) => console.log("E", e))
        .finally(() => router.refresh());
    }
  };
  // useEffect(() => {
  //   deleteProduct()
  // }, []);
  return (
    <React.Fragment>
      {loading && (
        <div className="h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!loading && (
        <div className="adminproduct">
          <ul className="flex gap-2 flex-wrap pb-4">
            <li
              onClick={() => {
                setcategory("");
                setCurrentPage(1);
              }}
              className={`${
                category === ""
                  ? "bg-[#197693] text-[#fff]"
                  : "bg-[#f2f2f2] text-[#000]"
              } max-sm:text-[13px] rounded-lg md:py-2 md:px-4 max-md:p-2 transtiton-all duration-500 cursor-pointer`}
            >
              All
            </li>
            {uniqueCategory?.map((categoryitem, index) => {
              return (
                <li
                  onClick={() => {
                    setcategory(categoryitem);
                    setCurrentPage(1);
                  }}
                  key={index}
                  className={`${
                    category === categoryitem
                      ? "bg-[#197693] text-[#fff]"
                      : "bg-[#f2f2f2] text-[#000]"
                  } max-sm:text-[13px] rounded-lg md:py-2 md:px-4 max-md:p-2 transtiton-all duration-500 cursor-pointer`}
                >
                  {categoryitem}
                </li>
              );
            })}
          </ul>
          {products?.slice(indexOfFirstItem, indexOfLastItem).map((val) => {
            {
              /* console.log("valllllll",val) */
            }
            const { title, price, thumbnail, category, _id } = val;
            return (
              <div
                key={_id}
                className={`${
                  theme === true
                    ? "bg-[#f2f2f2] text-[#000]"
                    : "bg-[#000] text-[#f2f2f2]"
                } border-[#f2f2f2] border-[1px] mb-2 p-3 max-sm:gap-x-1 rounded-lg flex justify-between items-center`}
              >
                <div className="flex leading-6 gap-x-8">
                  <div>
                    <Image
                      alt={title}
                      src={thumbnail}
                      loading="lazy"
                      width={90}
                      height={90}
                      className="w-[90px] h-[90px] rounded-full object-contain"
                    />
                  </div>
                  <div className="max-sm:leading-6">
                    <h3 className="max-sm:text-[14px]">{title}</h3>
                    <h4 className="max-sm:text-[13px]">{category}</h4>
                    <h3 className="max-sm:text-[14px]">{price}₹</h3>
                  </div>
                </div>
                <div className="max-sm:flex max-sm:flex-col max-sm:ml-[auto] max-sm:items-end">
                  <Link
                    href={`/productdata/${_id}`}
                    className="btn bg-blue-700"
                  >
                    View
                  </Link>
                  <Link
                    href={`/User/Admin/updateProduct/${_id}`}
                    className="btn bg-green-600"
                  >
                    Edit
                  </Link>
                  <button
                    href="/"
                    className="btn bg-red-600"
                    onClick={() => deleteProduct(_id, val)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          {products.length <= 0 && (
            <div className="flex justify-center items-center h-[50vh] max-sm:text-center mx-[auto]">
              <h4 className="text-3xl max-sm:text-2xl font-bold">
                Not Product show for this {role}
              </h4>
            </div>
          )}
          {products?.length >= itemsPerPage && (
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={products?.length}
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
          {/* <Custompagination
            totalitem={filterproductscount}
            itemperpage={productperpage}
            loader={loader}
          /> */}
        </div>
      )}
    </React.Fragment>
  );
};

export default Adminproduct;
