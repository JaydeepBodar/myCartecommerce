"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Custompagination from "../Custompagination";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Tostify from "../Tostify";
const Adminproduct = ({ product }) => {
  const { productperpage, productcount, filterproductscount, products } =
    product;
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
      <Tostify />
      <div className="adminproduct">
        {products?.map((val) => {
          const { title, price, thumbnail, category, _id } = val;
          return (
            <div
              key={_id}
              className="bg-[#f2f2f2] mb-2 p-3 max-sm:gap-x-1 rounded-lg flex justify-between items-center"
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
                <Link href={`/productdata/${_id}`} className="btn bg-blue-700">
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
        <Custompagination
          totalitem={filterproductscount}
          itemperpage={productperpage}
        />
      </div>
    </React.Fragment>
  );
};

export default Adminproduct;
