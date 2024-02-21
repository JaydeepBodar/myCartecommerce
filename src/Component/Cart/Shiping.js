"use client";
import React, { useState, useEffect } from "react";
import Container from "../Container";
import Cartitem from "./Cartitem";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiOutlinePlus } from "react-icons/ai";
import Loader from "../Loader";
import { CartgloblContext } from "@/Context/Cartcontext";
import { toast } from "react-toastify";
import Tostify from "../Tostify";
import { useSession } from "next-auth/react";
const Shiping = ({ address }) => {
  const { cart } = CartgloblContext();
  const session=useSession()
  const router = useRouter();
  const [shippingInfo, setshippingInfo] = useState();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    if (address) {
      setloading(false);
    }
    router.refresh();
  }, [loading]);
  const checkOuthandler =async() => {
    if (!shippingInfo) {
      toast.error("Please select shiping address");
    } else {
      try{
        const {data}=await axios.post(`${process.env.API_URL}api/Order/checkout_session`,{
          items:cart?.cartItems,
          shippingInfo,
          id:session.data?.user?._id,
          email:session.data?.user?.email
        }) 
        window.location.href=data.url
        
      }catch(e){
        console.log("e",e)
      }
      // stripe 
    }
  };
  return (
    <Container>
      {loading && (
        <div className="flex justify-center items-center h-[74.8vh]">
          <Loader />
        </div>
      )}
      <div
        className={`${
          cart?.cartItems?.length === 0 && "h-[81vh]"
        } flex gap-x-3 py-[66.5px] max-md:py-[20px] items-start max-md:flex-col`}
      >
        <Tostify/>
        {!loading && (
          <div className="w-[100%] basis-[75%] max-md:basis-[100%] max-md:py-2 border-[1px] border-[#cecbcb] px-4 py-3 h-[auto] mt-4 rounded-lg">
            <div className="pb-4 max-sm:text-[14px] flex justify-between flex-wrap gap-x-1">
              {address?.map((add, index) => {
                {/* console.log("add", add); */}
                const { street, city, country, phoneNo, state, zipcode, _id } =
                  add;
                return (
                  <div
                    key={index}
                    className="cursor-pointer leading-[25px] flex gap-x-4 bg-[#f2f2f2] basis-[48%] max-lg:basis-[100%] p-4 rounded-lg mb-3"
                    title="shiping address"
                  >
                    <input
                      type="radio"
                      name="radio"
                      className="cursor-pointer"
                      onClick={() => setshippingInfo(_id)}
                    />
                    <div>
                      <p>
                        {street}, {city},
                      </p>{" "}
                      <p>
                        {state} ,{country},
                      </p>{" "}
                      <p>
                        Contact:-{phoneNo} ,Postalcode:-{zipcode};
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              href="/Address/New"
              className="w-[100%] text-center max-w-[160px] max-sm:text-[14px] max-sm:max-w-[120px] text-[17px] py-1 rounded-lg border-[1px] border-red-600 text-red-600 block"
            >
              <button className="flex items-center justify-center w-[100%] gap-x-2 max-md:gap-x-[2px]">
                <AiOutlinePlus />
                Add Address
              </button>
            </Link>
            <div className="flex justify-end gap-x-2 max-lg:pt-2">
              <Link
                href="/Cart"
                className="w-[100%] text-center max-w-[160px] max-sm:text-[14px] max-sm:max-w-[120px] text-[17px] py-1 rounded-lg border-[1px] border-red-600 text-red-600 block"
              >
                Back
              </Link>
              <div
                className="w-[100%] text-center max-w-[160px] max-sm:text-[14px] max-sm:max-w-[120px] text-[17px] py-1 rounded-lg border-[1px] border-[#008000] bg-[#008000] text-white"
                onClick={checkOuthandler}
              >
                Checkout
              </div>
            </div>
          </div>
        )}
        <div className="max-md:w-[100%] basis-[25%]">
          <Cartitem />
        </div>
      </div>
    </Container>
  );
};

export default Shiping;
