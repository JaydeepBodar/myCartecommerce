import productSchema from "../model/productSchema"
import { products } from "public/product"
import db from "../db"
const allproduct = async(req,res) => {
    await db()
    try{
        await productSchema.deleteMany({})
        await productSchema.insertMany(products)
        console.log("product added successfully")
    }catch(e){
        console.log("error to add product")
    }
}

export default allproduct
