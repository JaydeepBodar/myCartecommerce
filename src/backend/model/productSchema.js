import mongoose from "mongoose";
import model from "./Userschema";
const SizeSchema = mongoose.Schema({
  size: { type: String,default:null }, 
  quantity: { type: Number, default: 0 }, 
  color: { type: String },
  stock: { type: Boolean, default: true }, 
})
const productSchema = mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    thumbnail: String,
    category: String,
    images: [String],
    price: Number,
    discountPercentage: Number,
    Instock: {
      type: String,
      default: "InStock",
    },
    rating: {
      type: Number,
      default: 4,
    },
    featured:{
      type:Boolean,
      default:false,
    },
    subcategory:{
      default:null,
      type:String,
    },
    retailer:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"     
    },
    sizes:[SizeSchema],
    reviews: [
      {
        userdata: {
          type: mongoose.Schema.Types.ObjectId,
          required:true,
          ref: "User",  
        },
        comment: {
          type: String,
          default: "",
        },
        rating: {
          type: Number,
          default: 4,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);
export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
  