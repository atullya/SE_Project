import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://atullya:atullya123@cluster0.ku9ry.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Blog", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (conn) {
      console.log("MongoDB connection Successfull!!");
    }
  } catch (error) {
    console.log("Error in connection", error);
  }
};
