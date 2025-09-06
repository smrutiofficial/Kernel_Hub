import Tags from "../../../backend/models/Tags.model";
import { NextResponse } from "next/server";


// Get all tags
export const GET = async () => {
  try {
    const tag = await Tags.find();
    NextResponse.status(200).json(tag);
  } catch (_error) {
    return NextResponse.json({
      error: "Failed to retrieve tags"
    }, { status: 500 });
  }
};
