import mongoose from "mongoose";
const addressSchema = mongoose.Schema({
  street: { type: String },
  state: { type: String },
  country: { type: String },
  city: { type: String },
  zipcode: { type: String },
  phoneNo: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});
export default mongoose.models.Address ||
  mongoose.model("Address", addressSchema);
