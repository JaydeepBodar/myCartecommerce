import productSchema from "../model/productSchema";
import db from "../db";
export const getAllproduct = async (req, res) => {
  try {
    // await db();
    const data = await productSchema.find();
    res.json(data);
  } catch (e) {
    res.json({ message: "error" });
  }
};
export const postproduct = async (req, res) => {
  try {
    const data = await productSchema.create(req.body);
    console.log("data", data);
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
