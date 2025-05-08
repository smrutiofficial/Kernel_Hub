import connectDB from "../../backend/lib/db/db"; 
import Post from "../../backend/models/Post.model";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 12;
    const category = searchParams.get("category");
    const sort = searchParams.get("sort") || "newest";

    const query = {};
    if (category) query.category = category;

    let sortOption = {};
    if (sort === "newest") sortOption = { createdAt: -1 };
    else if (sort === "a-z") sortOption = { title: 1 };
    else if (sort === "popular") sortOption = { comments: -1 };

    const totalPosts = await Post.countDocuments(query);

    const posts = await Post.find(query)
      .sort(sortOption)
      .limit(limit)
      .skip((page - 1) * limit);

    return NextResponse.json({
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      posts,
    });
  } catch (err) {
    console.error(err.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
