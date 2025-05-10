import Post from "../../../../backend/models/Post.model";
import {NextResponse} from "next/server";

export const PUT = async (req) => {
    const { id } = req.params;
    const { title, content, slug, tags } = req.body;
    const image = req.file ? `/public/temp/${req.file.filename}` : "";
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { title, content, slug, tags, ...(image && { image }) },
        { new: true }
      );
      if (!updatedPost)
        return NextResponse.status(404).json({ message: "Post not found" });
      NextResponse.status(200).json(updatedPost);
    } catch (error) {
      NextResponse.status(500).json({ message: "Error updating post", error });
    }
  };