import Tags from "../../../../backend/models/Tags.model";
import { NextResponse } from "next/server";


// Delete a specific tag
export const DELETE = async (req) => {
    try {
      const { id } = req.params;
      const  tag = await Tags.findByIdAndDelete(id);
      if (! tag) return NextResponse.status(404).json({ message: "Tag not found" });
      NextResponse.status(200).json({ message: "Tag deleted successfully" });
    } catch (error) {
        NextResponse.status(500).json({ message: "Failed to delete tag", error });
    }
  };
  