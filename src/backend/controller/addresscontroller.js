
import { useSession } from "next-auth/react";
import Addressschema from "../model/Addressschema";

export const postAddress = async (req, res) => {
  // console.log("req.body", req.body);
  const address = await Addressschema.create(req.body);
  if (!req.body) {
    res.status(400).json({ message: "All field are Required" });
  } else {
    res.status(200).json({ address, message: "address add successfully" });
  }
};  
export const getAddress = async (req, res) => {
  // console.log("req.user._id",req.user._id)  
  const address = await Addressschema.find({user:req.user._id});
  res.status(200).json({ address });
};
export const getoneAddress = async (req, res) => {
  const address = await Addressschema.findById(req.query._id);
  res.status(200).json({ address });
};
export const updateaddress = async (req, res) => {
  let address = await Addressschema.findById(req.query._id);
  if (!address) {
    res.status(400).json({ message: "Address Not Found" });
  } else {
    address = await Addressschema.findByIdAndUpdate(req.query._id,req.body);
    res.status(200).json({ address, message: "Address update successfully" });
  }
};
