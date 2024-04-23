import mongoose from "mongoose";
import { string } from "yup";
const orderSchema = mongoose.Schema(
  {
    shippingInfo: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref: "Address",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Products",
    },
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },  
    retailerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },                                                                
    onlydiscount: {
      type: Number,
      default: "",
    },
    orderStatus: {
      type: String,
      default: "Processing",
    },
    paymentId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    }},
  { timestamps: true }
);                                          
export default mongoose.models.Order || mongoose.model("Order", orderSchema);
