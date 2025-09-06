// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import Comment from "../../../backend/models/Comment.model";

export async function GET(request) {
  try {
    // Handle build-time prerendering when request might be undefined
    if (!request || !request.url) {
      return NextResponse.json({
        totalComments: 0,
        totalPages: 0,
        currentPage: 1,
        comments: [],
      });
    }

    // Get query parameters from URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    // Database operations
    const totalComments = await Comment.countDocuments();
    const comments = await Comment.find()
      .populate("author", ["name", "email"])
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    // Return the response (you were missing 'return' here)
    return NextResponse.json({
      totalComments,
      totalPages: Math.ceil(totalComments / limit),
      currentPage: Number(page),
      comments,
    });
  } catch (err) {
    console.error("Comments error:", err.message);
    return NextResponse.json(
      { error: "Server error", message: err.message },
      { status: 500 }
    );
  }
}
