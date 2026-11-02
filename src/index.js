import dotenv from "dotenv";

// Load environment variables before connecting to MongoDB.
dotenv.config();

const { default: app } = await import("./app.js");
const { default: connectDB } = await import("./config/database.js");

const PORT = process.env.PORT || 4000;

try {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error("Server startup failed:", error.message);
  process.exit(1);
}
