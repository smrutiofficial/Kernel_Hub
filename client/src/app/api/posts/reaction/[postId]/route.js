import { NextResponse } from "next/server";
import Post from "../../../../backend/models/Post.model";
import connectDB from "../../../../backend/lib/db/db"; // Ensure DB is connected

export const POST = async (req, { params }) => {
  const { postId } = params;
  const body = await req.json(); // Required to extract JSON body from the request
  const { userId, reactionType } = body;

  try {
    await connectDB();

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const existingReactionIndex = post.reactions.findIndex(
      (reaction) => reaction.userId.toString() === userId
    );

    if (existingReactionIndex >= 0) {
      post.reactions[existingReactionIndex].type = reactionType;
    } else {
      post.reactions.push({ userId, type: reactionType });
    }

    await post.save();
    return NextResponse.json(post);
  } catch (error) {
    console.error("Reaction Error:", error);
    return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
  }
};
