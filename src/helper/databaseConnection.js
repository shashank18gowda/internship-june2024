import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/internship_june";
// const url = "mongodb+srv://shashank18gowda:1234567890@cluster0.0wtryvw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async () => {
  try {
    // await mongoose.connect(url,{dbName:"internship"})
    await mongoose.connect(url)

    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
