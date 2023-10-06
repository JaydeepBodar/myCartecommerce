"use client";
import React, { useState } from "react";
import ReactStars from "react-stars";
import Image from "next/image";
import Container from "../Container";
import Loader from "../Loader";
import Link from "next/link";
import { CartgloblContext } from "@/Context/Cartcontext";
import { useSession } from "next-auth/react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import Tostify from "../Tostify";
import UserReview from "../UserReview";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
const Productdetais = ({ singleproduct, loading, handleEditing }) => {
  const { cart, addItemtocart, deletItem } = CartgloblContext();
  const session = useSession();
  const [img, setimg] = useState("");
  const [btn, setbtn] = useState("Add Cart");
  const [show, setshow] = useState(false);
  const openBox = () => setshow(true);
  const [comment, setcomment] = useState("");
  const router = useRouter();
  const [rating, setrating] = useState(0);
  // console.log("objectratingratingrating", rating, comment);
  // console.log("singleproduct", singleproduct);
  const Removeitem = () => {
    let text =
      "if you really want to remove item from the cart ? if yes then press ok otherwise press cancle";
    if (window.confirm(text) == true) {
      deletItem(singleproduct?.products?._id);
      setbtn("Add Cart");
    }
  };
  const productbtn = cart?.cartItems?.some(
    (item) => item._id === singleproduct?.products?._id
  );
  const discount = parseInt(
    (
      singleproduct?.products?.price -
      (singleproduct?.products?.price *
        singleproduct?.products?.discountPercentage) /
        100
    ).toFixed(0)
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productreview = singleproduct?.products?.reviews.filter(
      (data) => data?.userdata?._id == session?.data?.user?._id
    );
    if (!rating) {
      toast.error("Rating must required");
    } else if (session?.status === "unauthenticated") {
      toast.error("You need to login to Add product review");
    }else if(productreview.length > 1){
      toast.error("You can not add more than two review")
    }
     else {
      await axios
        .put(
          `${process.env.API_URL}api/products/${singleproduct?.products?._id}`,
          {
            rating,
            comment,
            userdata: session?.data?.user?._id,
          }
        )
        .then((res) => console.log("objectres", res))
        .catch((e) => console.log("eeeeeeeeeeee", e));
    }
    setcomment("");
    setrating("");
  };
  // console.log("discount", typeof discount)
  return (
    <Container>
      {loading && (
        <div className="flex justify-center items-center h-[80vh]">
          <Loader />
        </div>
      )}
      {!loading && (
        <React.Fragment>
          <Tostify />
          <div className="grid grid-flow-col grid-col-2 gap-x-6 max-md:grid-flow-row mb-3 py-6">
            <div>
              <Image
                alt={singleproduct?.products?.title}
                src={img ? img : singleproduct?.products?.thumbnail}
                width={300}
                height={400}
                loading="lazy"
                className="w-[100%] h-[400px] object-fill rounded-lg border-[1px] border-[#000]"
              />
              <div className="flex gap-x-2 mt-4 justify-center">
                {singleproduct?.products?.images
                  ?.slice(0, 3)
                  .map((img, index) => {
                    return (
                      <Image
                        alt={singleproduct?.products?.title}
                        width={150}
                        height={100}
                        className="max-sm:w-[100px] border-[1px] border-[#000] h-[100px] rounded-lg object-fill cursor-pointer"
                        onClick={() => setimg(img)}
                        src={img}
                        key={index}
                        loading="lazy"
                      />
                    );
                  })}
              </div>
            </div>
            <div className="px-2 py-2">
              <h3 className="font-semibold text-2xl pb-2 pt-10">
                {singleproduct?.products?.title}
              </h3>
              <h4 className="text-xl font-semibold">
                Discount :-{" "}
                <span className="text-[green]">
                  {singleproduct?.products?.discountPercentage}%
                </span>
              </h4>
              <p className="text-lg font-medium">
                Category :- {singleproduct?.products?.category}
              </p>
              <div onClick={openBox}>
                <ReactStars
                  edit={false}
                  count={5}
                  size={24}
                  color2={"#ffd700"}
                  value={singleproduct?.products?.rating}
                />
              </div>
              <p>Description :- {singleproduct?.products?.description}</p>
              <h5 className="text-xl font-semibold">
                <span className="text-[green]">
                  DiscountPrice:-
                  {(
                    (singleproduct?.products?.price *
                      singleproduct?.products?.discountPercentage) /
                    100
                  ).toFixed(0)}
                  ₹
                </span>
              </h5>
              <h5 className="text-xl font-semibold">
                Price:- {singleproduct?.products?.price}₹
              </h5>
              <div className="flex items-center gap-x-3 mt-5">
                <>
                  {session?.data?.user?.role !== "Admin" &&
                    (singleproduct?.products?.stock === "InStock" ? (
                      <>
                        <button
                          onClick={() => {
                            addItemtocart({
                              _id: singleproduct?.products?._id,
                              title: singleproduct?.products?.title,
                              thumbnail: singleproduct?.products?.thumbnail,
                              category: singleproduct?.products?.category,
                              discountPercentage:
                                singleproduct?.products?.discountPercentage,
                              discountprice: discount,
                              price: singleproduct?.products?.price,
                            });
                            if (
                              productbtn === true ||
                              cart?.cartItems?.length >= 0
                            ) {
                              setbtn("Go to Cart");
                            } else {
                              setbtn("Add Cart");
                            }
                          }}
                          className="w-[100%] max-w-[100px] bg-red-600 text-white py-2 block text-center font-semibold tracking-wide rounded-lg border-[1px] border-red-600"
                        >
                          {btn}
                        </button>
                        {btn === "Go to Cart" && (
                          <button
                            className={`${
                              productbtn === false && "hidden"
                            } text-center py-2 w-[100%] max-w-[100px] border-[1px] border-red-600 text-red-600 rounded-lg tracking-wide`}
                            onClick={Removeitem}
                          >
                            Remove
                          </button>
                        )}
                      </>
                    ) : (
                      <h2 className="text-red-600 font-semibold">
                        Currently Out of Stock
                      </h2>
                    ))}
                  {session?.data?.user?.role === "Admin" && (
                    <Link
                      href="/User/Admin/Allproduct"
                      className="w-[100%] max-w-[100px] bg-red-600 text-white py-2 block text-center font-semibold tracking-wide rounded-lg"
                    >
                      Back
                    </Link>
                  )}
                </>
              </div>
              {!show && (
                <button
                  onClick={openBox}
                  className="flex items-center justify-center gap-x-2 mt-3 w-[100%] max-w-[130px] border-red-600 text-red-600 border-[1px] py-1 text-center font-semibold tracking-wide rounded-lg"
                >
                  <AiOutlinePlus />
                  Add Review
                </button>
              )}
              {show && (
                <React.Fragment>
                  <div className="bg-[#f2f2f2] p-3 rounded-lg flex flex-col gap-y-1 my-3 relative">
                    <div
                      className="absolute right-4 cursor-pointer"
                      onClick={() => setshow(false)}
                    >
                      <AiOutlineClose />
                    </div>
                    <h3 className="text-red-600">Enter your Rating</h3>
                    <form onSubmit={handleSubmit}>
                      <ReactStars
                        onChange={(rating) => setrating(rating)}
                        value={rating}
                        count={5}
                        size={24}
                        color2={"#ffd700"}
                      />
                      <textarea
                        className="w-[100%] border-[1px] border-[gray] outline-0 rounded-md p-2"
                        onChange={(e) => setcomment(e.target.value)}
                        rows="3"
                        value={comment}
                        placeholder="Enter your Review...(Optional)"
                      />
                      <button
                        onClick={handleEditing}
                        className="w-[100%] max-w-[120px] py-1 text-red-600 border-[1px] border-red-600 rounded-lg mt-2"
                        type="submit"
                      >
                        Post
                      </button>
                    </form>
                  </div>
                </React.Fragment>
              )}
              <div className="mt-3">
                {singleproduct?.products?.reviews?.length > 0 && (
                  <h3 className="font-semibold py-2">Product Review</h3>
                )}
                {singleproduct?.products?.reviews?.map((reviews) => {
                  return (
                    <UserReview
                    key={reviews?._id}
                      review={reviews}
                      user={session?.data?.user?._id}
                      product={singleproduct?.products}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </Container>
  );
};

export default Productdetais;
