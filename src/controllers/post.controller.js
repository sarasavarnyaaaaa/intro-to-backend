import mongoose from "mongoose";
import Post from "../models/post.model.js";

// CREATE a post.
const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || age === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const post = await Post.create({ name, description, age });

    return res.status(201).json({
      message: "Post created successfully",
      post
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

// READ all posts.
const getAllPosts = async (_req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({
      message: "Posts fetched successfully",
      posts
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

// READ one post using its MongoDB document ID.
const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({
      message: "Post fetched successfully",
      post
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

// UPDATE some fields (PATCH) and return the updated document.
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

// DELETE a post using its ID.
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({
      message: "Post successfully deleted"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
};

export { createPost, getAllPosts, getPostById, updatePost, deletePost };
