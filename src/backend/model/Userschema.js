import mongoose from "mongoose";
const Userdata = mongoose.Schema(
  {
    name: { type: String, require },
    email: { type: String, require },
    password: { type: String, require },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dxlicroam/image/upload/v1690896471/uploadimg/myCarteCommerce/Useprofile/Demouser_Tue%20Aug%2001%202023%2018:58:30%20GMT%2B0530%20%28India%20Standard%20Time%29.png",
    },
    role: { type: String, require, default: "user" },
    verifytoken:{
      type: String,
  }
  },
  { timestamps: true }
);
const model=mongoose.models.User || mongoose.model("User", Userdata);
export default model
