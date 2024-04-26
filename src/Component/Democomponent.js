"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { Router } from "next/router";
import React,{useState} from "react"
const Democomponent = ({ data }) => {
    const router=useRouter()
    const categoryfield = [
        ...new Set(data?.productdata?.map((val) => val?.subcategory)),
      ];
      let searchparams;
      const [subcategorys,setsubcategorys]=useState() 
      const handledata=(category)=>{
        searchparams=new URLSearchParams(window.location.search)
        searchparams.set("category",category.toString())
        const path="?" +searchparams.toString()
        router.push(path)
        // console.log("window",window)
      }
  return (
    <>
      <ul className="flex gap-2 items-center">
        {categoryfield?.map((data,index) => {
          return <li key={index} onClick={()=>handledata(data)} className="bg-red-600 text-white">{data}</li>;
        })}
      </ul>
      <div>
        {data?.productdata?.map((data,index) => {
          return (
            <div key={index}>
              <h2>{data?.title}</h2>
              <p>{data?.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Democomponent;
