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
  const [price, setprices] = useState({ min: "", max: "" });
  let Minvalue;
  let Maxvalue;
  // const [priceMax, setPriceMin] = useState('');
  // const [priceMax, setPriceMax] = useState('');
  useEffect(() => {
    // const categorydata =
    //   subcategory === undefined
    //     ? `${env.APIURL}/api/productcategory/${params.category}`
    //     : `${env.APIURL}/api/productcategory/${params.category}?subcategory=${subcategory}`;
    axios
      .get(
        `${env.APIURL}/api/productcategory/${params.category}?subcategory=${subcategory}&priceMin=${price?.min}&priceMax=${price?.max}`
      )
      .then((res) => {
          setsingleproduct(res.data.productdata);
      })
      .catch((e) => console.log("e", e))
      .finally(() => setloading(false));
  }, [loading, subcategory, price]);
  useEffect(() => {
    axios
      .get(`${env.APIURL}/api/productcategory/${params.category}`)
      .then((res) => setcategorydata(res.data.productdata))
      .catch((e) => e);
  }, []);
  const productdata = categorydata?.map((data) => data?.price);
  if (subcategory !== "") {
    const newdata = categorydata?.filter(
      (data) => data.subcategory === subcategory
    );
    const filtrprice = newdata?.map((val) => val.price);
    Minvalue = Math?.min(0);
    Maxvalue = Math?.max(...filtrprice);
  } else if (subcategory === "") {
    Minvalue = Math?.min(0);
    Maxvalue = Math?.max(...productdata)
  }
  // console.log("productdata-----", productdata);
  // console.log(
  //   "MinvalueMinvalueMinvalueMinvalue",singleproduct
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
    setprices(value);
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
        price={price}
        handleSliderChange={handleSliderChange}
      />
    </div>
  );
};

export default Categorypage;
