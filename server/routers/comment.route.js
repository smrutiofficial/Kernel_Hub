const express = require("express");
const {
  createComment,
  getCommentsForPost,
  getAllComments,
  deleteComment
} = require("../controllers/comment.cotroller.js");
const auth = require("../middlewares/auth.middleware.js");

const router = express.Router();

// Create a comment (requires authentication)
router.post("/", auth, createComment);

// Get comments for a specific post
router.get("/:postId", getCommentsForPost);
router.get('/', getAllComments); 
router.delete("/:id", deleteComment);
module.exports = router;
