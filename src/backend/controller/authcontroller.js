import Userschema from "../model/Userschema";
import bcrypt from "bcrypt";
import { uploads } from "../utils/cloudinary";
import fs from "fs";
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await Userschema.findOne({ email: email });
  if (user) {
    res.status(400).json({ message: "User alreday exists" });
  } else {
    const haspassword = await bcrypt.hash(password, 10);
    const userdata = await Userschema.create({
      name: name,
      email: email,
      password: haspassword,
    });
    console.log("userdata", userdata);
    res.status(200).json({ message: "Successfully register" });
  }
};
export const updateUser = async (req, res) => {
  const updateuser = {
    name: req.body.name,
    email: req.body.email,
    avatar: req.body.avatar,
  };
  // if (req.files?.length > 0) {
  //   const uploader = async (path) => await uploads(path, "uploadimg/myCartEcommerce/Userprofile");
  //   const file = req.files[0];
  //   const { path } = file;
  //   const avatarResponse = await uploader(path);
  //   console.log("avtatarResponse",avatarResponse)
  //   fs.unlinkSync(path);
  //   updateuser.avatar=avatarResponse
  // }
  const user = await Userschema.findByIdAndUpdate(req.body._id, updateuser, {
    new: true,
  });
  console.log("user", user);
  res.status(200).json({ message: "Successfully Update Profile" });
};
export const update_password = async (req, res) => {
  const { currentpassword, newpassword, id } = req.body;
  const user = await Userschema.find({ _id: id });
  console.log("user", user);
  const comparePassword = await bcrypt.compare(
    currentpassword,
    user[0].password
  );
  // console.log("dadadaadaddafsfdw", comparePassword);
  if (!comparePassword) {
    res.status(400).json({ message: "Wrong password try again" });
  }
  else{
    user[0].password = await bcrypt.hash(newpassword, 10);
    await user[0].save();
    // console.log("user",user)
    // console.log("user.password", user.password);e
    res.status(200).json({ message: "Password updated successfully" });
  }
};
