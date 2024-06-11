import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/internship_june";

const connectDB = async () => {
  try {
    await mongoose.connect(url)
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
