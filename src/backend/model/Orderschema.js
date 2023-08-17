import mongoose from "mongoose";
const orderSchema = mongoose.Schema(
  {
    shippingInfo: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Addresss",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
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
          type: String,
          required: true,
        },
      },
    ],
    paymentInfo: {
      id: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      taxPaid: {
        type: Number,
        required: true,
      },
      amountPaid: {
        type: Number,
        required: true,
      },
    },
    orderStatus: {
      type: String,
      default: "Processing",
    },
  },
  { timestamps: true }
);
export default mongoose.models.Order || mongoose.model("Order", orderSchema);
