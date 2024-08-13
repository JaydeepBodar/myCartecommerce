import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect("mongodb+srv://Adminuser:Jb246802@cluster0.0rbnmky.mongodb.net/nextEcommerce?retryWrites=true&w=majority");
    console.log("Connection successfully");
  } catch (e) {
    console.log("faield to connect to database");
  }
};

export default db;
