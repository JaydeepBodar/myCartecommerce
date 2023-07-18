"use client";
import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, useContext } from "react";
export const Cartcontext = createContext();
const Cartprovider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const router = useRouter();
  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };
  console.log("cart", cart.cartItems);
  const addItemtocart = async ({
    _id,
    title,
    thumbnail,
    category,
    discountPercentage,
    price,
    quantity = 1,
  }) => {
    const item = {
      _id,
      title,
      thumbnail,
      category,
      discountPercentage,
      price,
      quantity,
    };
    const isItemExist = cart?.cartItems?.find(
      (i) => i._id === item._id
    );
    console.log("isitem",isItemExist)
    let newCartItems;

    if (isItemExist) {
      let cartitems= cart?.cartItems?.map((i) =>
        i._id === isItemExist._id ? item : i
      );
      newCartItems=cartitems.filter(cartitem=>cartitem.quantity >0)
    } else {
      newCartItems = [...(cart?.cartItems || []), item];
    }

    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCartToState();
  };
  const deletItem=(id)=>{
    const deleteitem=cart?.cartItems?.filter((deleteitem)=>deleteitem._id !== id)
    console.log("deleteitem",deleteitem)
    localStorage.setItem("cart",JSON.stringify({cartItems:deleteitem}))
    setCartToState();
  }
  return (
    <Cartcontext.Provider value={{ cart, addItemtocart,deletItem }}>
      {children}
    </Cartcontext.Provider>
  );
};
export default Cartprovider;
export const CartgloblContext = () => {
  return useContext(Cartcontext);
};
