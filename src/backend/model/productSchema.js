import mongoose from "mongoose";
import model from "./Userschema";
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
    reviews: [
      {
        userdata: {
          type: mongoose.Schema.Types.ObjectId,
          required:true,
          ref: "Users",
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
