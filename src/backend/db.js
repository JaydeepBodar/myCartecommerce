import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL2);
    console.log("Connection successfully");
  } catch (e) {
    console.log("faield to connect to database");
  }
};

export default db;
