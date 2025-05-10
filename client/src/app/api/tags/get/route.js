import Tags from "../../../backend/models/Tags.model";
import { NextResponse } from "next/server";


// Get all tags
export const GET = async () => {
    try {
      const tag = await Tags.find();
      NextResponse.status(200).json(tag);
    } catch (error) {
        NextResponse.status(500).json({ message: "Failed to retrieve tags", error });
    }
  };