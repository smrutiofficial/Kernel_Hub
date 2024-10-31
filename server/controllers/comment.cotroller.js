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
  const { id } = req.params;
  try {
    const deletedcomment = await Comment.findByIdAndDelete(id);
    if (!deletedcomment)
      return res.status(404).json({ message: "comment not found" });
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

module.exports = {
  createComment,
  getCommentsForPost,
  getAllComments,
  deleteComment,
};
