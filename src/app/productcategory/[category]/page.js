"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { env } from "@/config/env";
import Categorydemo from "@/Component/Categorydemo";
import usePreventUrlEdit from "@/Component/usePreventUrlEdit";
// servr rendering start
// import Democomponent from "@/Component/Democomponent";
// async function getCategoryproduct(category,subcategory) {
//   // try {
//     const response = await axios.get(`${process.env.API_URL}/api/productcategory/${category}?subcategory=${subcategory}`);
//     return response.data;

//   // } catch (error) {
//   //   return {
//   //     props: { error: 'Internal Server Error' },
//   //   };
//   // }
// }
// export async function getServerSideProps({ query }){
//   console.log("queryqueryqueryqueryquery",query)
// }
// const page=async({params})=>{
//   let newcategory=""
//   const hadleCategorydata=(data)=>{
//       newcategory=data
//       console.log("subcategorysubcategorysubcategorysubcategory",newcategory)
//   }
//   const data=await getCategoryproduct(params.category,newcategory)
//   return <Democomponent data={data} subcategory={hadleCategorydata}/>
// }
// export default page
// server rendering end
const Categorypage = ({ params }) => {
  const [singleproduct, setsingleproduct] = useState([]);
  const [loading, setloading] = useState(true);
  const [loading1, setloading1] = useState(true);
  const [subcategory, setsubcategory] = useState("");
  const [categorydata, setcategorydata] = useState([]);
  const [price, setprices] = useState({ min: "", max: "" });
  let Minvalue;
  let Maxvalue;
  // const [priceMax, setPriceMin] = useState('');
  // const [priceMax, setPriceMax] = useState('');
  usePreventUrlEdit()
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
      .finally(() => setloading1(false));
  }, [loading1, subcategory, price]);
  useEffect(() => {
    axios
      .get(`${env.APIURL}/api/productcategory/${params.category}`)
      .then((res) => setcategorydata(res.data.productdata))
      .catch((e) => e).finally(() => setloading(false));
  }, [loading]);
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
    setloading1(true)
    setprices(value)
  };
  console.log("loading1",loading1)
  return (
    <div>
      <Categorydemo
        singleproduct={singleproduct}
        subcategory={subcategory}
        setsubcategory={setsubcategory}
        categorydata={categorydata}
        loading={loading}
        loading1={loading1}
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
        setloading1={setloading1}
      />
    </div>
  );
};

export default Categorypage;
