import { ERROR, SUCCESS } from "../config/statusText.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const addComment = asyncHandler(async (req, res) => {
  const author = req.user?._id;
  const { content, postId } = req.body;
  try {
    if (!content || !postId || !author) {
      return res
        .status(400)
        .json({ error: "Content, postId, and author are required." });
    }

    const comment = new Comment({ content, postId, author });
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment._id },
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

export const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  try {
    if (!commentId) {
      return res.status(400).json({ error: "Comment ID is required." });
    }
    const deleteComment = await Comment.findByIdAndDelete(commentId);
    if (deleteComment) {
      return res
        .status(200)
        .json({ status: SUCCESS, message: "Comment deleted" });
    } else {
      return res.status(404).json({ error: "Comment not found." });
    }
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
export const updateComment = async (req, res) => {
  const { commentId, content } = req.body;
  try {
    if (!commentId || !content) {
      return res
        .status(400)
        .json({ error: "Comment ID and content are required." });
    }
    const updateComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    if (updateComment) {
      return res.status(200).json({ status: SUCCESS, data: updateComment });
    } else {
      return res.status(404).json({ error: "Comment not found." });
    }
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const makeLikeComment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { commentId } = req.body;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    return res
      .status(404)
      .json({ status: "ERROR", message: "Comment not found" });
  }

  if (comment.likes.includes(userId)) {
    comment.likes.pull(userId);
    await comment.save();
    return res
      .status(200)
      .json({ status: "SUCCESS", message: "Removed like", like: false });
  }

  comment.likes.push(userId);
  await comment.save();

  res.status(201).json({
    status: "SUCCESS",
    message: "Added like successfully",
    like: true,
  });
});
