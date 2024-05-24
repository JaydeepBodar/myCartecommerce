import productSchema from "../model/productSchema";
import APIFilter from "../utils/APIFilter";
export const getAllproductdata = async (req, res) => {
  const products = await productSchema.find();
  res.status(200).json({ products });
};
export const getRetailproduct = async (req, res) => {
  const { page } = req.query;
  const productperpage = 5;
  const filterproductscount = "";
  const currentpage = Number(page) || 1;
  const skippage = productperpage * (currentpage - 1);
  console.log("req.user", req.user);
  const productcount = await productSchema
    .find({ retailer: req.user._id })
    .countDocuments();
  const products = await productSchema
    .find({ retailer: req.user._id })
    .limit(productperpage)
    .skip(skippage);
  res.json({
    productperpage,
    productcount,
    filterproductscount,
    products,
  });
};
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
  // console.log("data", data);
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
    // console.log("deleteProduct", deleteProduct);
    res.status(200).json({ message: "Product succssefully delete" });
  } catch (e) {
    res.status(400).json({ message: "error shown" });
  }
};
export const singleProduct = async (req, res) => {
  const { id } = req.query;
  // try {
  const data = await productSchema.findById({ _id: id }).populate([
    {
      path: "reviews.userdata",
      model: "User",
      select: "name email avatar", 
    },
    "retailer",
  ]);
  // console.log("req.user._id",req.user._id)
  res.json({ products: data });
  // } catch (e) {
  //   res.json({ message: "unable to show" });
  // }
};
export const singleCategory = async (req, res) => {
  const { category, subcategory, priceMin, priceMax, page } = req.query;
  // const itemperpage = 6;
  // const currentpage = Number(page) || 1;
  // const totalskipitem = itemperpage * (currentpage - 1);
  // try {
  let query = {};
  const numPricemax = Number(priceMax);
  const numPricemin = Number(priceMin);
  if (category) {
    query.category = category;
  }
  if (subcategory) {
    query.subcategory = subcategory;
  }
  if (priceMin || priceMax) {
    query.price = { $gte: numPricemin, $lte: numPricemax };
  }
  // let data;
  const productdata = await productSchema.find(query).populate("retailer");
  // .limit(itemperpage)
  // .skip(totalskipitem);
  // const totalproduct = await productSchema.find(query).countDocuments();
  // console.log("productdataproductdata", query);
  // // console.log("req.user._id",req.user._id)
  // if (subcategory !== undefined) {
  //   data = productdata?.filter((data) => data?.subcategory === subcategory);
  // } else {
  //   data = productdata;
  // }
  res.json({
    productdata,
  });
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
    console.log("eeee", e);
    res.status(400).json({ message: "Something went to wrong!" });
  }
};
export const postReview = async (req, res) => {
  const { rating, userdata, comment } = req.body;
  const product = await productSchema.findById({ _id: req.query.id });
  const ratingdata = (product?.rating + rating) / 2;
  const review = [];
  review.push({ rating, userdata, comment });
  const productdata =
    product?.reviews?.length > 0
      ? product?.reviews?.concat({ rating, userdata, comment })
      : review;
  // console.log("firstproductdata", productdata);
  const ratingpost = await productSchema.updateOne(
    { _id: req.query.id },
    {
      rating: product?.reviews?.length === 0 ? rating : ratingdata,
      reviews: productdata,
    }
  );
  // console.log("firstreview", review);
  // console.log("ratingdata", ratingpost);
  res.status(200).json({ message: "Product review add Succsessfully" });
};
export const deleteReview = async (req, res) => {
  const deleteReview = await productSchema.updateOne(
    { _id: req.query.id },
    { $pull: { reviews: { _id: req.body.id } } }
  );
  if (deleteReview) {
    const product = await productSchema.findById({ _id: req.query.id });
    let sum = 0;
    const userReviewfinds = product.reviews?.map((val) => {
      sum += val?.rating;
    });
    const updaterating = (sum / userReviewfinds?.length).toFixed(2);
    const updatereview = await productSchema.updateOne(
      { _id: req.query.id },
      { rating: userReviewfinds?.length === 0 ? 0 : updaterating }
    );
    // console.log("objectupdatereview", updatereview);
  }
  res.status(200).json({ message: "Succsessfully Review delete" });
};
export const getReview = async (req, res) => {
  const product = await productSchema.findOne(
    { _id: req.query.id },
    { reviews: { $elemMatch: { _id: req.query.id } }, _id: 0 }
  );
  // console.log("objectproduct", product);
  res.status(200).json({ product });
};
export const updateReview = async (req, res) => {
  const { rating, comment } = req.body;
  const updateproduct = await productSchema
    .findOneAndUpdate(
      { _id: req.query.id, "reviews._id": req.query.id },
      {
        $set: {
          "reviews.$.comment": comment, // Replace with the updated comment
          "reviews.$.rating": rating, // Replace with the updated rating
        },
      }
    )
    .populate("User");
  if (updateproduct) {
    const product = await productSchema.findById({ _id: req.query.id[0] });
    // console.log("objectproduct", product);
    let sum = 0;
    const userReviewfinds = product.reviews?.map((val) => {
      sum += val?.rating;
    });
    const updaterating = (sum / userReviewfinds?.length).toFixed(2);
    const updatereview = await productSchema.updateOne(
      { _id: req.query.id },
      { rating: userReviewfinds?.length === 0 ? 0 : updaterating }
    );
    // console.log("objectupdatereview", updatereview);
  }
  // console.log("updateeee", updateproduct);
  res.status(200).json({ message: "Succsessfully Review Update" });
};
export const searchProduct = async (req, res) => {
  const search = req.query.search;
  const keyword = search
    ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      }
    : {};
  // console.log("keywordkeywordkeyword", keyword);
  const productdata = await productSchema.find(keyword);
  res.status(200).json({ productdata });
};
export const testMonalis = async (req, res) => {
  const productreview = await productSchema
    .find({}, { reviews: 1, _id: 0 })
    .populate({
      path: "reviews.userdata",
      model: "User",
      select: "name email avatar", // Specify the fields you want to populate for the user
    });
  // console.log("productreviewproductreview", productreview);
  res.status(200).json({ productreview });
};
// export const singlesize = async (req, res) => {
//   const { product_id ,updateData,size_id} = req.body;
//   const productreview = await productSchema
//     .findById(product_id)
//     .then((product) => {
//       console.log("productproduct", product);
//       const productsize=product?.sizes?.findIndex(size=>size._id == size_id)
//       if (sizeIndex !== -1) {
//         // Update the size object at the found index with the update data
//         product.sizes[productsize].set(updateData);
//         // Save the updated product document
//         return product.save();
//       } else {
//         console.log("Size not found");
//         return;
//       }
//     });
//   console.log("productsizeproductsize", productreview);
//   res.status(200).json(productreview);
// };
