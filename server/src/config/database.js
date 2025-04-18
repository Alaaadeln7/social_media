import mongoose from "mongoose";

export const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
}