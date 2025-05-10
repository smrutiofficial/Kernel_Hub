import Post from "../../../backend/models/Post.model";
import {NextResponse} from "next/server";

export const createPost = async (req) => {
    try {
      if (!req.file) {
        return NextResponse.status(400).json({ message: "No file uploaded." });
      }
  
      const { title, slug, tags, content } = req.body;
      // const imagePath = req.file.path; // Adjust if needed
      const imagename = req.file.filename;
  
      // console.log("Image Path:", imagePath); // Log the image path for debugging
      // console.log("Image name:", imagename); // Log the image path for debugging
  
      const newPost = new Post({
        title,
        slug,
        tags: tags.split(",").map((tag) => tag.trim()),
        content,
        image: imagename,
      });
  
      // console.log(newPost);
  
      // Add your logic to save `newPost` to the database here
      // Save the post
      const post = await newPost.save();
      NextResponse.json(post);
    } catch (error) {
      console.error("Error creating post:", error);
      NextResponse.status(500).json({ message: "Error creating post", error });
    }
  };