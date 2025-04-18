import { Schema, model } from "mongoose";

const sharePostSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const SharePost = model("SharePost", sharePostSchema);
export default SharePost;