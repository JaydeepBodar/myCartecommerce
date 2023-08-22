import Allorder from "@/Component/Admin/Allorder"
import axios from "axios"

async function getData(){
  const {data}=await axios.get(`${process.env.API_URL}api/Order/Allorder`,{headers:{"Content-Type": "application/json"}})
  if(!data){
    console.log("error")
  }
  return data.order
}
const Order = async() => {
  const order=await getData()
  return <Allorder order={order}/>
}

export default Order
