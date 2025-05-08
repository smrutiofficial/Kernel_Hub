import { NextResponse } from "next/server";
import { authenticate } from "../../backend/middlewares/auth.middleware";
import Post from "../../backend/models/Post.model";
import Comment from "../../backend/models/Comment.model";

export const POST = authenticate(async (req) => {
  try {
    const { body, postId } = await req.json();

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ msg: "Post not found" }, { status: 404 });
    }

    const newComment = new Comment({
      body,
      author: req.user.id, // This will now be defined
      post: postId,
    });

    const savedComment = await newComment.save();
    return NextResponse.json(savedComment, { status: 201 });
  } catch (err) {
    console.error("POST /api/comments error:", err);
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
});
