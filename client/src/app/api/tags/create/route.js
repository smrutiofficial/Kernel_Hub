import Tags from "../../../backend/models/Tags.model";
import { NextResponse } from "next/server";

// Create a tag
export const POST = async (req) => {
  try {
    const { tagname } = req.body;
    const tag = new Tags({ tagname });
    await tag.save();
    NextResponse.status(201).json( tag);
  } catch (error) {
    NextResponse.status(500).json({ message: "Failed to create tag", error });
  }
};





