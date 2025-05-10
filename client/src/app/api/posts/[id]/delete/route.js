import Post from "../../../../backend/models/Post.model";
import {NextResponse} from "next/server";

export const DELETE = async (req) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost)
      return NextResponse.status(404).json({ message: "Post not found" });
    NextResponse.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    NextResponse.status(500).json({ message: "Error deleting post", error });
  }
};
