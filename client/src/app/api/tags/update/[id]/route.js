import Tags from "../../../../backend/models/Tags.model";
import { NextResponse } from "next/server";

// Update a specific tag
export const PUT = async (req) => {
    try {
      const { id } = req.params;
      const { tagname } = req.body;
      const  tag = await Tags.findByIdAndUpdate(id, { tagname }, { new: true });
      if (! tag) return NextResponse.status(404).json({ message: "Tag not found" });
      NextResponse.status(200).json( tag);
    } catch (error) {
        NextResponse.status(500).json({ message: "Failed to update tag", error });
    }
  };