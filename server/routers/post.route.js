const express = require("express");
const { upload } = require("../middlewares/upload.middlewares.js");

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  addOrUpdateReaction,
} = require("../controllers/post.controller.js");
// const auth = require("../middlewares/auth.middleware.js"); // We'll implement this middleware next

const router = express.Router();

// Get all posts
router.get("/", getPosts);
// Create a post
// Create a post with image upload
router.post("/newpost", upload.single("image"), createPost);
// Get a specific post by ID
router.get("/:id", getPostById);

// Update an existing post
router.put("/:id", updatePost);
// Delete a post
router.delete("/:id", deletePost);
// add or update reactions
router.post('/:postId/reaction', addOrUpdateReaction);

module.exports = router;
