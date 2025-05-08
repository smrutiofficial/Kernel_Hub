import connectDB from "../../../../backend/lib/db/db";
import { NextResponse } from "next/server";

// Delete a comment
export const DELETE = async (req) => {
  const { id } = req.params;
  try {
    await connectDB();

    const deletedcomment = await Comment.findByIdAndDelete(id);
    if (!deletedcomment)
      return NextResponse.status(404).json({ message: "comment not found" });
    NextResponse.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    NextResponse.status(500).json({ message: "Error deleting comment", error });
  }
};
