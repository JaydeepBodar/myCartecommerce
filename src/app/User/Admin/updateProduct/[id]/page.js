import Productupdate from '@/Component/Admin/Productupdate'
import React from 'react'
import axios from 'axios'
async function getData(id){
  // console.log("id",id)
    const {data}=await axios.get(`${process.env.API_URL}api/admin/product/${id}`)
    // console.log("data",data)
    if(!data){
        // console.log("errorr")
    }
    return data.products
}

const updateProduct = async({params}) => {
const product=await getData(params.id)
  return <Productupdate product={product}/>
}
export default updateProduct
