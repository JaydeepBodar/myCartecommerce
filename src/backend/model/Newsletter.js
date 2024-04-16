import mongoose from "mongoose";
const newsletteremail = mongoose.Schema(
  {
    email: {  type: String,required: true },
  },
  { timestamps: true }
);
export default mongoose.models.Newsletteremail || mongoose.model("Newsletteremail", newsletteremail);