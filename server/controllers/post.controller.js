const Post = require("../models/Post.model.js");
const User = require("../models/User.model.js");

// Create a post
const createPost = async (req, res) => {
  const { title, body } = req.body;

  try {
    const user = await User.findById(req.user.id);

    const newPost = new Post({
      title,
      body,
      author: req.user.id, // req.user will come from the authentication middleware
    });

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
      .populate("author", ["name", "email"])
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
    const post = await Post.findById(req.params.id).populate("author", ["name", "email"]);

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

module.exports = { createPost, getPosts, getPostById };

