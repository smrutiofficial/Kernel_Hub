const Comment = require("../models/Comment.model.js");
const Post = require("../models/Post.model.js");

// Create a comment
const createComment = async (req, res) => {
  const { body, postId } = req.body;

  try {
    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const newComment = new Comment({
      body,
      author: req.user.id, // req.user will come from the authentication middleware
      post: postId,
    });

    const comment = await newComment.save();
    res.json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get comments for a specific post
const getCommentsForPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId })
      .populate("author", ["name", "email"])
      .sort({ createdAt: -1 }); // Sort by newest first

    res.json(comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all comments with pagination
const getAllComments = async (req, res) => {
  const { page = 1, limit = 12 } = req.query;

  try {
    const totalComments = await Comment.countDocuments();
    const comments = await Comment.find()
      .populate("author", ["name", "email"])
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      totalComments,
      totalPages: Math.ceil(totalComments / limit),
      currentPage: Number(page),
      comments,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // Optional: Check if the user is the author of the comment
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: "User not authorized" });
    }

    await comment.remove();
    res.json({ msg: "Comment deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { createComment, getCommentsForPost, getAllComments, deleteComment };
