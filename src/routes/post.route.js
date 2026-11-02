import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} from "../controllers/post.controller.js";

const router = Router();

router.post("/create", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.patch("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);

export default router;
