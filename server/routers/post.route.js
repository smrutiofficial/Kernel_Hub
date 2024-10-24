const express = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/post.controller.js");
// const auth = require("../middlewares/auth.middleware.js"); // We'll implement this middleware next

const router = express.Router();

// Get all posts
router.get("/", getPosts);
// Create a post
router.post("/newpost", createPost);
// Get a specific post by ID
router.get("/:id", getPostById);

// Update an existing post
router.put("/:id", updatePost);
// Delete a post
router.delete("/:id", deletePost);

module.exports = router;
