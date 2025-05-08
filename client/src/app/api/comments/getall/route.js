import { NextResponse } from "next/server";
import Comment from "../../../backend/models/Comment.model";

// Get all comments with pagination
export const GET = async (req) => {
  const { page = 1, limit = 12 } = req.query;

  try {
    const totalComments = await Comment.countDocuments();
    const comments = await Comment.find()
      .populate("author", ["name", "email"])
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

      NextResponse.json({
      totalComments,
      totalPages: Math.ceil(totalComments / limit),
      currentPage: Number(page),
      comments,
    });
  } catch (err) {
    console.error(err.message);
    NextResponse.status(500).send("Server error");
  }
};