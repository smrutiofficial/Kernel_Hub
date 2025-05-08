import Post from "../../../backend/models/Post.model";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({ msg: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (err) {
    console.error(err.message);

    // Optional: check for invalid ObjectId (Mongoose handles this gracefully)
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
};
