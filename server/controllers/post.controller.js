const Post = require("../models/Post.model.js");

// Create a post
const createPost = async (req, res) => {
  const { title, slug, image, tags, content } = req.body;

  try {
    // Check if all required fields are present
    if (!title || !slug || !tags || !content) {
      return res.status(400).json({ msg: "Please fill in all fields" });
    }

    // Check if tags is an array
    if (!Array.isArray(tags)) {
      return res.status(400).json({ msg: "Tags must be an array" });
    }

    // Create a new post
    const newPost = new Post({
      title,
      slug,
      image,
      tags,
      content,
    });

    // Save the post
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getPosts = async (req, res) => {
  const { page = 1, limit = 12, category, sort = "newest" } = req.query;

  try {
    const query = {}; // Initialize an empty query

    // If a category is provided, add it to the query
    if (category) {
      query.category = category;
    }

    // Handle sorting options
    let sortOption = {};
    if (sort === "newest") {
      sortOption = { createdAt: -1 }; // Newest first
    } else if (sort === "a-z") {
      sortOption = { title: 1 }; // Alphabetical order A-Z
    } else if (sort === "popular") {
      sortOption = { comments: -1 }; // Most comments first
    }

    const totalPosts = await Post.countDocuments(query); // Count posts with applied filters

    // Fetch posts with pagination, filtering, and sorting
    const posts = await Post.find(query)
      .sort(sortOption)
      .limit(Number(limit))
      .skip((page - 1) * limit);

    // Respond with posts and pagination data
    res.json({
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: Number(page),
      posts,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a specific post by ID
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);

    // Check for invalid ObjectId
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.status(500).send("Server error");
  }
};

// Update an existing post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
