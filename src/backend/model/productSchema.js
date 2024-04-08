import mongoose from "mongoose";
import model from "./Userschema";
const SizeSchema = mongoose.Schema({
  size: { type: String, required: true,default:null }, // Size value (e.g., S, M, L, 7, 8, 9)
  quantity: { type: Number, default: 0 }, // Quantity available for this size
  color: { type: String }, // Color of the product
  stock: { type: Boolean, default: true }, // Stock availability for this size
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
    stock: {
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
          required: true,
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
