"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { env } from "@/config/env";
import Categorydemo from "@/Component/Categorydemo";
const Categorypage = ({ params }) => {
  const [singleproduct, setsingleproduct] = useState([]);
  const [loading, setloading] = useState(true);
  const [subcategory, setsubcategory] = useState("");
  const [categorydata, setcategorydata] = useState([]);
  const [price, setprices] = useState({ price: { min: "", max: "" } });
  let Minvalue;
  let Maxvalue;
  let allsucategory = [];
  // const [priceMax, setPriceMin] = useState('');
  // const [priceMax, setPriceMax] = useState('');
  useEffect(() => {
    // const categorydata =
    //   subcategory === undefined
    //     ? `${env.APIURL}/api/productcategory/${params.category}`
    //     : `${env.APIURL}/api/productcategory/${params.category}?subcategory=${subcategory}`;
    axios
      .get(
        `${env.APIURL}/api/productcategory/${params.category}?subcategory=${subcategory}&priceMin=${price?.price?.min}&priceMax=${price?.price?.max}`
      )
      .then((res) => {
        if (subcategory === "") {
          setsingleproduct(res.data.productdata);
          setcategorydata(res.data.productdata);
        } else {
          setsingleproduct(res.data.productdata);
        }
      })
      .catch((e) => console.log("e", e))
      .finally(() => setloading(false));
  }, [loading, subcategory, price?.price?.min, price?.price?.max]);
  if (subcategory === "" && categorydata?.length > 0) {
    const productdata = singleproduct?.map((data) => data?.price);
    // console.log("...productdata", ...productdata);
    // console.log("categorydata", categorydata);
    Minvalue = Math?.min(...productdata);
    Maxvalue = Math?.max(...productdata);
    // console.log("Minvalue", Minvalue);
    // console.log("Maxvalue", Maxvalue);
  } else {
    const newdata = categorydata?.filter(
      (data) => data.subcategory === subcategory
    );
    const filtrprice = newdata?.map((val) => val.price);
    Minvalue = Math?.min(0);
    Maxvalue = Math?.max(...filtrprice);
    // console.log("...filtrprice", ...filtrprice);
  }
  // console.log("productdata-----", productdata);
  // console.log(
  //   "MinvalueMinvalueMinvalueMinvalue",
  //   Maxvalue,
  //   "categorydatacategorydata",
  //   Minvalue
  // );
  // for dynamic changes
  // const hanleMaxrange = (e) => {
  //   const value=e.target.value.replace(/\D/g, '')
  //   setPriceMax(value);
  // };
  // const hanleMinrange = (e) => {
  //   const value=e.target.value.replace(/\D/g, '')
  //   setPriceMin(value);
  // };
  // for packages changes
  const handleSliderChange = (value) => {
    setprices((prev) => ({ ...prev, price: value }));
  };
  return (
    <div>
      <Categorydemo
        singleproduct={singleproduct}
        subcategory={subcategory}
        setsubcategory={setsubcategory}
        categorydata={categorydata}
        loading={loading}
        category={params.category}
        // hanleMaxrange={hanleMaxrange}
        // hanleMinrange={hanleMinrange}
        minValue={Minvalue}
        maxValue={Maxvalue}
        // priceMin={priceMin}
        // priceMax={priceMax}
        setprices={setprices}
        price={price?.price}
        handleSliderChange={handleSliderChange}
      />
    </div>
  );
};

export default Categorypage;
