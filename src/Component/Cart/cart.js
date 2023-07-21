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
    return acc + ((item.price * item.discountPercentage) / 100) * item.quantity;
  }, 0);
  const Totalprice = netAmount - disCountprice;
  console.log("netAmount", netAmount);
  const deleteProduct = (id) => {
    let text =
      "if you really want to remove item from the cart ? if yes then press ok otherwise press cancle";
    if (window.confirm(text) == true) {
      deletItem(id);
    }
  };
  // console.log("cart", cart.cartItems);
  return (
    <React.Fragment>
      <div className="h-[81.8vh] max-lg:h-[auto]">
        <div className="tracking-[1.2px] bg-red-600 text-white font-semibold text-2xl py-5">
          <Container>
            <h3>
              {" "}
              items (<Totalquantityt />) in Cart
            </h3>
          </Container>
        </div>
        <Container>
          <div className="flex mt-4 mb-2 gap-x-4 max-lg:flex-col-reverse">
            <div className="max-lg:py-4 basis-[65%] min-h-[100%]">
              <div className={`${cart.cartItems?.length > 0 && "scrollbar"}`}>
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
                      <div
                        key={_id}
                        className="flex justify-between items-center max-sm:flex-col mb-2 px-3 py-2 border-[1px] border-[#bbbbbb] rounded-lg"
                      >
                        <div className="basis-[70%] max-sm:basis-[100%] max-sm:w-[100%] flex items-center gap-x-4">
                          <Link href={`/productdata/${_id}`} className='w-[100%] max-w-[150px] h-[100%] max-h-[200px] flex justify-center'>
                            <Image
                              src={thumbnail}
                              alt="title"
                              width={150}
                              height={200}
                              style={{
                                borderRadius: "50%",
                                objectFill: "contain",
                                cursor:'pointer',
                                width:'100%'
                              }}
                            />
                          </Link>
                          <div>
                            <h3 className="text-xl font-semibold max-sm:text-lg">
                              Product name:-{title}
                            </h3>
                            <h4 className="text-lg font-medium max-sm:text-base">
                              Category:-{category}
                            </h4>
                          </div>
                        </div>
                        <div className="max-sm:pt-3 flex justify-between basis-[30%] max-sm:basis-[100%] max-sm:justify-end max-sm:gap-x-3 max-sm:w-[100%]">
                          <div className="flex items-center gap-x-2">
                            <button
                              className="px-3 max-md:px-[6px] max-md:leading-[20px] py-1 bg-slate-200"
                              onClick={() => removeitem(value)}
                            >
                              -
                            </button>
                            <h5 className="text-lg font-semibold">
                              {quantity}
                            </h5>
                            <button
                              className="px-3 py-1 max-md:px-[6px] max-md:leading-[20px] bg-slate-200"
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
            </div>
            {cart?.cartItems?.length > 0 && (
              <div className="cartfont basis-[30%] px-5 py-4 border-[1px] border-[#bbbbbb] rounded-lg">
                <div className="flex justify-between items-center">
                  <h4>Price :-</h4>
                  <h4>{netAmount.toFixed(2)}$</h4>
                </div>
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">Quantity:-</h4>
                  <h4>
                    <Totalquantityt />
                  </h4>
                </div>
                <div className="flex justify-between items-center text-[green]">
                  <h4>Discount</h4>
                  <h4>{disCountprice.toFixed(2)}$</h4>
                </div>
                <div className="flex justify-between items-center text-[red]">
                  <h4>Total Price(Without Discount)</h4>
                  <del>{netAmount.toFixed(2)}$</del>
                </div>
                <div className="flex justify-between items-center border-t-[2px] border-[#000] mt-2 text-lg font-semibold pt-2">
                  <h3>Total Price(With Discount):-</h3>
                  <h3>{Totalprice.toFixed(2)}$</h3>
                </div>
                <div className="mt-5">
                  <Link
                    href="/Cart"
                    className="font-semibold rounded-lg block w-[100%] text-center text-[white] bg-[green] py-2"
                  >
                    Place Order
                  </Link>
                  <Link
                    href="/"
                    className="mt-3 font-semibold rounded-lg block w-[100%] text-center text-[green] border-[1px] border-[green] py-2"
                  >
                    Back to Shop
                  </Link>
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
