import { NextResponse } from "next/server";
// import { authenticate } from "../../backend/middlewares/auth.middleware";
// import Post from "../../backend/models/Post.model";
import Comment from "../../../backend/models/Comment.model"; // Make sure this exists
import connectDB from "@/app/backend/lib/db/db";

export const GET = async (req, { params }) => {
  const { postId } = params;

  try {
    await connectDB();
    const comments = await Comment.find({ post: postId })
      .populate("author", ["name", "email"])
      .sort({ createdAt: -1 });

    return NextResponse.json(comments);
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
