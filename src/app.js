import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

// Middleware: parse JSON and URL-encoded request bodies.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Backend is running" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// Handle unknown routes.
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
