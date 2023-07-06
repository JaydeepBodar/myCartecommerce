import mongoose from "mongoose";
const productSchema = mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    thumbnail: String,
    category: String,
    images: [String],
    price: Number,
    rating: Number,
    discountPercentage: Number,
    reviews:[{
        rating:{
            type:Number
        },
        comment:{
            type:String,
            require:true
        },createdAt:{
            type:Date,
            default:Date.now
        }
    }]
  },
  { timestamp: true }
);
export default mongoose.models.Product || mongoose.model('Product',productSchema)
