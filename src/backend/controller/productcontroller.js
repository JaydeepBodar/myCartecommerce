import productSchema from "../model/productSchema";
import APIFilter from "../utils/APIFilter";
import db from "../db";
export const getAllproduct = async (req, res) => {
  try {
    // await db();
    const apiFilter=new APIFilter(productSchema.find(),req.query).search()
    console.log('apifil',apiFilter)
    const data = await apiFilter.query;
    // console.log("data",data)
    console.log("data",typeof data);
    res.status(200).json(data);
  } catch (e) {
    res.json({ message: "error" });  
  }
};
export const postproduct = async (req, res) => {
  try {
    const data = await productSchema.create(req.body);
    res.json({ message: "data added sucsessfully" });
  } catch (e) {
    res.json({ message: "unable to add" });
  }
};
export const singleProduct = async (req, res) => {
  const { id } = req.query;
  try { 
    const data = await productSchema.findOne({_id:id});
    console.log("data",data)
    res.json(data)
  } catch (e) {
    res.json({ message: "unable to show" });
  }
};
