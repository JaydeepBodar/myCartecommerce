import mongoose from "mongoose";
const Userdata = mongoose.Schema(
  {
    name: { type: String, require },
    email: { type: String, require },
    password: { type: String, require },
    avtar: { type: String, require },
    role: { type: String, require, default: "user" },
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model("User", Userdata);
