"use client";
import { CartgloblContext } from "@/Context/Cartcontext";
import React from "react";
import Container from "../Container";
import Image from "next/image";
import Link from "next/link";
import Totalquantityt from "../Totalquantityt";
const cart = () => {
  const { cart, addItemtocart, deletItem } = CartgloblContext();
  console.log("addItemtocart", addItemtocart);
  // const additem=(item)=>{
  // 	console.log("item",item)
  // 	const newQue=item.quantity +1
  // 	const newitem={...item,quantity:newQue}
  // 	console.log("newitem",newitem)
  // 	addItemtocart(newitem)
  // }
  const additem = (cartItem) => {
    const newQty = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQty };
    addItemtocart(item);
  };
  const removeitem = (item) => {
    const newqut = item.quantity - 1;
    const cartItem = { ...item, quantity: newqut };
    if (newqut <= 0) {
    }
    addItemtocart(cartItem);
  };
  const netAmount = cart?.cartItems?.reduce((acc, item) => {
    console.log("item", item);
    return acc + item.price * item.quantity;
  }, 0);
  const disCountprice = cart?.cartItems?.reduce((acc, item) => {
    return (
      acc +
      ((item.price * item.discountPercentage) / 100) * item.quantity
    );
  }, 0);
  const Totalprice = netAmount - disCountprice;
  console.log("netAmount", netAmount);
  const deleteProduct = (id) => {
    deletItem(id);
  };
  // console.log("cart", cart.cartItems);
  return (
    <React.Fragment>
      <div className="h-[81.8vh]">
        <div className="bg-red-600 py-4">
          <Container>
            <h3 className="text-white font-semibold text-xl">
              {" "}
              items (<Totalquantityt />) in cart cart
            </h3>
          </Container>
        </div>
        <Container>
          <div className="flex mt-4 mb-2 gap-x-4">
            <div className="basis-[65%]">
              {cart.cartItems?.length > 0 &&
                cart.cartItems?.map((value) => {
                  console.log("value", value);
                  const {
                    title,
                    price,
                    category,
                    thumbnail,
                    _id,
                    discountPercentage,
                    quantity,
                  } = value;
                  return (
                    <div className="flex justify-between items-center max-sm:flex-col mb-2">
                      <div className="flex gap-x-4">
                        <div>
                          <Image
                            src={thumbnail}
                            alt="title"
                            width={150}
                            height={200}
                            style={{ borderRadius: "50%", objectFill: "fill" }}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold max-sm:text-xl">
                            Product name:-{title}
                          </h3>
                          <h4 className="text-lg font-medium">
                            Category:-{category}
                          </h4>
                        </div>
                      </div>
                      <div className="flex justify-between basis-[50%]">
                        <div className="flex items-center gap-x-2">
                          <button
                            className="px-3 py-1 bg-slate-200"
                            onClick={() => removeitem(value)}
                          >
                            -
                          </button>
                          <h5 className="text-lg font-semibold">{quantity}</h5>
                          <button
                            className="px-3 py-1 bg-slate-200"
                            onClick={() => additem(value)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => deleteProduct(_id)}
                          className="w-[100%] max-w-[100px] border-[1px] border-red-600 text-red-600 rounded-lg"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
            {cart?.cartItems?.length > 0 && (
              <div className="basis-[30%] px-3 py-2 border-[1px] border-[#f2f2f2]">
                <div className="flex justify-between items-center">
                  <h4>Price :-</h4>
                  <h4>{netAmount}$</h4>
                </div>
                <div className="flex justify-between items-center">
                  <h4>Quantity:-</h4>
                  <h4>
                    <Totalquantityt />
                  </h4>
                </div>
                <div className="flex justify-between items-center">
                  <h4>Discount</h4>
                  <h4>{disCountprice.toFixed(0)}$</h4>
                </div>
                <div className="flex justify-between items-center">
                  <h3>Total Price:-</h3>
                  <h3>{Totalprice.toFixed(0)}$</h3>
                </div>
              </div>
            )}
          </div>
          {cart?.cartItems?.length === 0 && (
            <p className="flex justify-center items-center h-[60vh] text-2xl font-semibold">
              Your cart is empty&nbsp;
              <Link
                href="/"
                className="text-[red] font-normal decoration-slice"
              >
                Back to Shop
              </Link>
            </p>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default cart;
