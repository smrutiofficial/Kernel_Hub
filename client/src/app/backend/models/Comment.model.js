import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", // Reference to the Post model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);

