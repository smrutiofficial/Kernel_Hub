import Post from "../../../../backend/models/Post.model";

export const PUT = async (req, res) => {
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
        return res.status(404).json({ message: "Post not found" });
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: "Error updating post", error });
    }
  };