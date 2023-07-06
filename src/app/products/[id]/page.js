import Productdetais from "@/Component/product/Productdetais";
import React from "react";

async function getData(id){
    const data=await fetch(`${process.env.API}/api/products/${id}`, { cache: "no-store" } )
    if(!data){
        console.log('err')
    }
    return data.json()
}
const data = async({ params }) => {
    const singleproduct=await getData(params.id)
    return <Productdetais singleproduct={singleproduct}/>;
};

export default data;
