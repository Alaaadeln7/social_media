import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    content: { type: String, required: true },
    image: { type: String, default: "" },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    shares: [{ type: Schema.Types.ObjectId, ref: "Share" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);
export default Post;
