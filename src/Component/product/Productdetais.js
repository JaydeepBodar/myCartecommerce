"use client";
import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import Image from "next/image";
import Container from "../Container";
import Loader from "../Loader";
import Link from "next/link";
import { CartgloblContext } from "@/Context/Cartcontext";
import { useSession } from "next-auth/react";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { toast } from "react-toastify";
import UserReview from "../User/UserReview";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Globalthemeprovider } from "@/Context/Themeprovider";
const Productdetais = ({ singleproduct, loading, handleEditing }) => {
  const { cart, addItemtocart, deletItem } = CartgloblContext();
  const { theme } = Globalthemeprovider();
  const session = useSession();
  const [img, setimg] = useState("");
  const [btn, setbtn] = useState("Add Cart");
  const [show, setshow] = useState(false);
  const openBox = () => setshow(true);
  const [reviewdata, setreviewdata] = useState();
  const [dataload, setdataload] = useState(true);
  const handleClose = () => {
    setdataload(false);
  };
  const router = useRouter();
  const [comment, setcomment] = useState("");
  const [rating, setrating] = useState(0);
  const [open, setopen] = useState(false);

  const handleOpen = () => {
    setopen(true);
  };
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
  console.log("productbtnproductbtnproductbtnproductbtn",productbtn)
  const discount = (
    singleproduct?.products?.price -
    (singleproduct?.products?.price *
      singleproduct?.products?.discountPercentage) /
      100
  ).toFixed(0);

  // const onlydiscount= singleproduct?.products?.price - discount
  // console.log("onlydiscountonlydiscount",onlydiscount)
  const getApi = async (id) => {
    // console.log("daaaaaa", id);
    await axios
      .get(
        `${process.env.API_URL}api/products/Getreview/${singleproduct?.products?._id}/${id}`
      )
      .then((res) => {
        setreviewdata(res?.data?.product);
      })
      .catch((e) => console.log("objecte", e));
  };
  useEffect(() => {
    setrating(reviewdata?.reviews[0]?.rating);
    setcomment(reviewdata?.reviews[0]?.comment);
    setopen(false);
  }, [open]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productreview = singleproduct?.products?.reviews.filter(
      (data) => data?.userdata?._id == session?.data?.user?._id
    );
    if (!rating) {
      toast.error("Rating must required");
    } else if (session?.status === "unauthenticated") {
      toast.error("You need to login to Add product review");
    } else if (open && productreview.length > 1) {
      toast.error("You can not add more than two review");
    } else {
      let data =
        reviewdata?.reviews?.length > 0
          ? `${process.env.API_URL}api/products/Getreview/${singleproduct?.products?._id}/${reviewdata?.reviews[0]._id}`
          : `${process.env.API_URL}api/products/${singleproduct?.products?._id}`;
      // console.log("objectdata", data);
      await axios
        .put(data, {
          rating,
          comment,
          userdata: session?.data?.user?._id,
        })
        .then((res) => console.log("objectres", res))
        .catch((e) => console.log("eeeeeeeeeeee", e));
    }
    setshow(false);
    setcomment(""), setrating("");
  };
  const [selection, setselection] = useState(null);
  const [selection1, setselection1] = useState(null);
  const [filter, setfilter] = useState({ size: "", color: "", stock: true });
  console.log("singleproduct?.products?.sizes",singleproduct?.products?.sizes[0]?.color,singleproduct?.products?.sizes[0]?.stock)
  const uniqueColors = Array.from(
    new Set(singleproduct?.products?.sizes.map((product) => product.color))
  );
  return (
    <Container>
      {loading && (
        <div className="flex justify-center items-center h-[80vh]">
          <Loader />
        </div>
      )}
      {!loading && (
        <React.Fragment>
          <div className="grid grid-flow-col grid-col-2 gap-x-6 max-md:grid-flow-row mb-3 py-6">
            <div>
              {singleproduct?.products?.thumbnail ? (
                <Image
                  alt={singleproduct?.products?.title}
                  src={
                    img
                      ? img !== null
                        ? img
                        : ""
                      : singleproduct?.products?.thumbnail
                  }
                  width={300}
                  height={400}
                  loading="lazy"
                  className="w-[100%] h-[400px] object-fill rounded-lg border-[1px] border-[#000]"
                />
              ) : (
                ""
              )}
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
              <h3 className="font-semibold text-2xl pb-2 pt-1reviwes0">
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
              <div onClick={openBox} className="flex items-center">
                <ReactStars
                  edit={false}
                  count={5}
                  size={24}
                  color2={"#ffd700"}
                  value={singleproduct?.products?.rating}
                />
                <h3 className="text-lg">
                  (&nbsp;
                  <span
                    className={`${
                      singleproduct?.products?.rating <= 2.5
                        ? "text-[#DC2626]"
                        : "text-[#008000]"
                    }`}
                  >
                    {singleproduct?.products?.rating.toFixed(2)}
                  </span>{" "}
                  Out of 5&nbsp;)
                </h3>
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
              {singleproduct?.products?.retailer?.name?.length > 0 && (
                <h5 className="text-xl font-semibold">
                  Seller:- {singleproduct?.products?.retailer?.name}
                </h5>
              )}
              {singleproduct?.products?.stock === "InStock" && (
                <>
                  {" "}
                  <p>Color Selection :-</p>
                  <div
                    className={`${
                      selection !== null && filter?.size !== "-"
                        ? "pb-14"
                        : "pb-7"
                    } flex gap-x-3 relative`}
                  >
                    {uniqueColors.map((color, index) => {
                      const filtercolor =
                        singleproduct?.products?.sizes?.filter(
                          (val) => val.color === color
                        );
                      return (
                        <>
                          <div
                            key={index}
                            className={`${
                              selection === index &&
                              "border-[1px] border-[gray] rounded-full"
                            } p-[2px]`}
                            onClick={() => {
                              setselection(index);
                              setselection1(0);
                              setfilter({
                                size:
                                  filtercolor[0]?.size === "-"
                                    ? "-"
                                    : filtercolor[0]?.size,
                                color: color,
                                stock:
                                  filtercolor[0]?.quantity > 0 ? true : false,
                              });
                            }}
                          >
                            <p
                              style={{ backgroundColor: color }}
                              className={`w-[15px] h-[15px] rounded-full border-[gray] border-[1px]`}
                            ></p>
                          </div>
                          <div className="absolute top-5 w-[100%]">
                            <div className="flex items-center gap-x-2 mt-1 relative">
                              {selection === index &&
                                filtercolor.map((val, indexdata) => {
                                  const { size, quantity, color, stock } = val;
                                  if (size !== "-") {
                                    return (
                                      <>
                                        <p
                                          key={indexdata}
                                          className={`${
                                            selection1 === indexdata &&
                                            "bg-[#197693] text-white"
                                          } p-1 w-[30px] text-center rounded-lg cursor-pointer`}
                                          onClick={() => {
                                            setselection1(indexdata),
                                              setfilter({
                                                color: color,
                                                size: size,
                                                stock:
                                                  quantity > 0 ? true : false,
                                              });
                                          }}
                                        >
                                          {size}{" "}
                                        </p>
                                        <span className="absolute top-9">
                                          {selection1 === indexdata &&
                                            filter?.size?.length > 0 && (
                                              <span
                                                className={`${
                                                  quantity > 0
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                }`}
                                              >
                                                {quantity > 0 ? (
                                                  <span>In Stock</span>
                                                ) : (
                                                  <span>Out of Stock</span>
                                                )}
                                                (
                                                {quantity <= 2 &&
                                                quantity > 0 ? (
                                                  <span>
                                                    Hurray! only {quantity} Item
                                                    left
                                                  </span>
                                                ) : (
                                                  <span>
                                                    {quantity} Items Avilabel
                                                  </span>
                                                )}
                                                )
                                              </span>
                                            )}
                                        </span>
                                      </>
                                    );
                                  } else {
                                    return (
                                      <>
                                        {selection === index &&
                                          filter?.size === "-" && (
                                            <span
                                              className="absolute top-0"
                                              key={indexdata}
                                            >
                                              <span
                                                className={`${
                                                  filter?.stock === true
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                }`}
                                              >
                                                {filter?.stock === true ? (
                                                  <span>In Stock</span>
                                                ) : (
                                                  <span>Out of Stock</span>
                                                )}
                                                (
                                                {quantity <= 2 &&
                                                quantity > 0 ? (
                                                  <span>
                                                    Hurray! only {quantity} Item
                                                    left
                                                  </span>
                                                ) : (
                                                  <span>
                                                    {quantity} Items Avilabel
                                                  </span>
                                                )}
                                                )
                                              </span>
                                            </span>
                                          )}
                                      </>
                                    );
                                  }
                                })}
                            </div>
                          </div>
                          {/* {selection === index && size === "" && (
                        <p className="absolute top-5">
                          {quantity > 0 ? (
                            <span className="text-green-600">
                              InStock({quantity})
                            </span>
                          ) : (
                            <span className="text-red-600">
                              Out of Stock({quantity})
                            </span>
                          )}
                        </p>
                      )} */}
                        </>
                      );
                    })}
                  </div>
                </>
              )}
              <div className="flex items-center gap-x-3 mt-5">
                <>
                  {filter?.stock === true &&
                    session?.data?.user?.role !== "Admin" &&
                    (singleproduct?.products?.stock === "InStock" ? (
                      <>
                        <button
                          onClick={() => {
                            if (filter?.color?.length === 0) {
                              toast.error("Please select color variant");
                            } else {
                              addItemtocart({
                              _id: singleproduct?.products?._id,
                              title: singleproduct?.products?.title,
                              thumbnail: singleproduct?.products?.thumbnail,
                              category: singleproduct?.products?.category,
                              discountPercentage:
                                singleproduct?.products?.discountPercentage,
                              discountprice: discount,
                              price: singleproduct?.products?.price,
                              onlydiscount:
                                singleproduct?.products?.price - discount,
                              size: filter?.size !== "" ? filter?.size : null,
                              color: filter?.color,
                              retailerId:
                                singleproduct?.products?.retailer?._id,
                            });
                              if (
                                productbtn === true ||
                                cart?.cartItems?.length >= 0
                              ) {
                                setbtn("Go to Cart");
                                router.push("/Cart")
                              } else {
                                setbtn("Add Cart");
                              }
                              
                            }
                          }}
                          className="w-[100%] max-w-[100px] bg-[#197693] text-white py-2 block text-center font-semibold tracking-wide rounded-lg border-[1px] border-[#197693]"
                        >
                          {btn}
                        </button>
                        {btn === "Go to Cart" && (
                          <button
                            className={`${
                              productbtn === false && "hidden"
                            } text-center py-2 w-[100%] max-w-[100px] border-[1px] border-[#197693] text-[#197693] rounded-lg tracking-wide`}
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
                      className="w-[100%] max-w-[100px] bg-[#197693] text-white py-2 block text-center font-semibold tracking-wide rounded-lg"
                    >
                      Back
                    </Link>
                  )}
                </>
              </div>
              {!show && reviewdata?.reviews?.length === undefined && (
                <button
                  onClick={() => {
                    openBox(), setcomment(""), setrating("");
                  }}
                  className="flex items-center justify-center gap-x-2 mt-3 w-[100%] max-w-[130px] border-[#197693] text-[#197693] border-[1px] py-1 text-center font-semibold tracking-wide rounded-lg"
                >
                  <AiOutlinePlus />
                  Add Review
                </button>
              )}
              {show && (
                <React.Fragment>
                  <div
                    className={`${
                      theme === true
                        ? "bg-[#f2f2f2] text-[#000]"
                        : "bg-[#000] text-[#f2f2f2]"
                    } border-[#f2f2f2] border-[1px] p-3 rounded-lg flex flex-col gap-y-1 my-3 relative`}
                  >
                    <div
                      className="absolute right-4 cursor-pointer"
                      onClick={() => setshow(false)}
                    >
                      <AiOutlineClose />
                    </div>
                    <h3 className="text-[#197693]">
                      {reviewdata?.reviews?.length > 0 ? (
                        <span>Edit</span>
                      ) : (
                        <span>Enter</span>
                      )}{" "}
                      your Rating
                    </h3>
                    <form className="text-[#000]" onSubmit={handleSubmit}>
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
                        className="w-[100%] max-w-[120px] py-1 text-[#197693] border-[1px] border-[#197693] rounded-lg mt-2"
                        type="submit"
                      >
                        {reviewdata?.reviews.length > 0 ? (
                          <span>Edit</span>
                        ) : (
                          <span>Post</span>
                        )}
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
                      show={openBox}
                      showdata={show}
                      review={reviews}
                      user={session?.data?.user?._id}
                      product={singleproduct?.products}
                      handleEditing={handleEditing}
                      getApi={getApi}
                      handleOpen={handleOpen}
                      handleClose={handleClose}
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
