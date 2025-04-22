import Post from "../models/postModel.js";
import User from "../models/UserModel.js";
import cloudinary from "cloudinary";
import asyncHandler from "../middlewares/asyncHandler.js";
import { ERROR, SUCCESS } from "../config/statusText.js";

export const createPost = asyncHandler(async (req, res) => {
  const author = req.user?._id;
  const { content, image } = req.body;
  let imageUrl = null;

  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "blogs",
    });
    imageUrl = uploadResponse.secure_url;
  }
  const newPost = new Post({ content, author, image: imageUrl });
  await newPost.save();
  return res.status(201).json(newPost);
});

export const getPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const totalPosts = await Post.countDocuments();
  const posts = await Post.find()
    .populate("author", "fullName avatar lastSeen")
    .populate({
      path: "comments",
      populate: { path: "author", select: "fullName avatar" },
    })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  return res.status(200).json({ posts, hasMore: page * limit < totalPosts });
});

// export const getPostsByUserId = asyncHandler(async (req, res) => {
//   const { userId } = req.params;

//   if (!userId) {
//     return res
//       .status(400)
//       .json({ status: "error", message: "User ID is required." });
//   }

//   const userExist = await User.findById(userId);

//   if (!userExist) {
//     return res
//       .status(404)
//       .json({ status: "error", message: "User not found." });
//   }

//   const posts = await Post.find({ author: userId })
//     .populate("likes", "fullName avatar")
//     .populate("author", "fullName avatar lastSeen")
//     .populate({
//       path: "comments",
//       populate: { path: "author", select: "fullName avatar" },
//     });

//   return res.status(200).json({
//     status: "success",
//     count: posts.length,
//     data: posts,
//   });
// });

export const updatePost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { postId, content, image } = req.body;
  if (!postId || !content) {
    return res.status(400).json({ error: "Post ID and content are required." });
  }
  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ status: ERROR, message: "Post not found." });
  }
  if (!post.author.equals(userId)) {
    return res.status(403).json({
      status: ERROR,
      message: "You are not authorized to update this post.",
    });
  }
  let imageUrl = post.image;
  if (image && image !== post.image) {
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;
  }
  post.image = imageUrl;
  post.content = content || post.content;
  await post.save();
  return res
    .status(200)
    .json({ message: "Post updated successfully.", status: SUCCESS });
});

export const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const userId = req.user._id;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ error: "Post not found." });
  }

  if (!post.author.equals(userId)) {
    return res
      .status(403)
      .json({ error: "You are not authorized to delete this post." });
  }

  await Post.findByIdAndDelete(postId);
  return res.status(200).json({ message: "Post deleted successfully." });
});
export const toggleLike = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { postId } = req.body;
  if (!userId || !postId) {
    return res.status(400).json({ error: "User ID and Post ID are required." });
  }
  const post = await Post.findById(postId);
  if (post.likes.includes(userId)) {
    post.likes.pull(userId);
    await post.save();
    return res
      .status(200)
      .json({ message: "Like removed successfully.", like: false });
  } else {
    post.likes.push(userId);
    const newLike = await post.save();
    return res
      .status(201)
      .json({ status: SUCCESS, message: "like added", like: true });
  }
});

export const makeSavedPost = asyncHandler(async (req, res) => {
  const { postId } = req.body;
  const userId = req.user._id;
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.savedPosts.push(postId);
  await user.save();
  return res.status(200).json({ message: "Post saved successfully" });
});

export const getSavedPosts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const savedPosts = await Post.find({ _id: { $in: user.savedPosts } })
    .populate("author", "fullName avatar lastSeen")
    .populate({
      path: "comments",
      select: "author content",
      populate: {
        path: "author",
        select: "fullName avatar",
      },
    });
  if (!savedPosts) {
    return res.status(404).json({ message: "Saved posts not found" });
  }
  if (savedPosts.length === 0) {
    return res.status(404).json({ status: SUCCESS, data: savedPosts });
  }
  return res.status(200).json({ status: SUCCESS, data: savedPosts });
});
