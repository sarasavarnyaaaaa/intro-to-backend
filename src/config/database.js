import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // The URI already contains the database name in the .env.example format.
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
