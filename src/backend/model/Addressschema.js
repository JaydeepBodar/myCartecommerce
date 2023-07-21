import mongoose from "mongoose";
const addressSchema = mongoose.Schema({
  street: { type: String },
  state: { type: String },
  country: { type: String },
  city: { type: String },
  zipcode: { type: String },
  phoneNo: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "Users" },
});
export default mongoose.models.Address ||
  mongoose.model("Address", addressSchema);
