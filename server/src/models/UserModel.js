import mongoose from "mongoose";
import { config } from "dotenv";
config();
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
      unique: true,
    },
    avatar: {
      type: String,
      required: false,
      default: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1735715517/avatars/default-avatar.png.jpg`,
    },
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Friend",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    bio: { type: String, default: "", required: false },
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      }
    ]
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
