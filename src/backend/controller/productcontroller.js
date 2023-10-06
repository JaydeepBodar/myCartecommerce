import productSchema from "../model/productSchema";
import APIFilter from "../utils/APIFilter";
import db from "../db";
export const getAllproduct = async (req, res) => {
  try {
    const productperpage = 4;
    const productcount = await productSchema.countDocuments();
    // await db();
    const apiFilter = new APIFilter(productSchema.find(), req.query)
      .search()
      .filter();
    // console.log('apifil',apiFilter)
    let products = await apiFilter.query;
    const filterproductscount = products.length;
    apiFilter.pagination(productperpage);
    products = await apiFilter.query.clone();
    // console.log("data",data)
    // console.log("data",typeof data);
    res.status(200).json({
      productperpage,
      productcount,
      filterproductscount,
      products,
    });
  } catch (e) {
    res.json({ message: "error" });
  }
};
export const postProduct = async (req, res) => {
  // req.body.user=req.user._id
  const data = await productSchema.create(req.body);
  console.log("data", data);
  res.json({ message: "data added sucsessfully" });
  //   } catch (e) {
  //     res.json({ message: "unable to add" });
  //   }
  // };
};
export const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await productSchema.findByIdAndDelete({
      _id: req.query.id,
    });
    console.log("deleteProduct", deleteProduct);
    res.status(200).json({ message: "Product succssefully delete" });
  } catch (e) {
    res.status(400).json({ message: "error shown" });
  }
};
export const singleProduct = async (req, res) => {
  const { id } = req.query;
  // try {
  const data = await productSchema
    .findById({ _id: id }).populate("reviews.userdata")
    // console.log("req.user._id",req.user._id)
  res.json({ products: data });
  // } catch (e) {
  //   res.json({ message: "unable to show" });
  // }
};
export const updateProduct = async (req, res) => {
  try {
    const updateProduct = await productSchema.findByIdAndUpdate(
      req.query.id,
      req.body
    );
    // console.log("updateProduct",updateProduct)
    res.status(200).json({ message: "Succsessfully update product" });
  } catch (e) {
    res.status(400).json({ message: "Something went to wrong!" });
  }
};
export const postReview = async (req, res) => {
  const { rating,userdata,comment } = req.body;
  const product = await productSchema.findById({ _id: req.query.id })
  const ratingdata = (product?.rating + rating) / 2;
  const review = [];
  review.push({ rating,userdata,comment});
  const productdata =
    product?.reviews?.length > 0
      ? product?.reviews?.concat({ rating,userdata,comment})
      : review;
  console.log("firstproductdata", productdata);
  const ratingpost = await productSchema.updateOne(
    { _id: req.query.id },
    { rating: ratingdata, reviews: productdata }
  );
  console.log("firstreview", review);
  console.log("ratingdata", ratingpost);
  res.status(200).json({message:"Product review add Succsessfully"});
};
export const deleteReview=async(req,res)=>{
  // const product = await productSchema.findById({ _id: req.query.id })
  const deleteReview=await productSchema.findByIdAndDelete({reviews:req.query.id})
  console.log("objectdeleteReview",deleteReview)
  res.status(200).json({message:"Succsessfully Review delete"})
}