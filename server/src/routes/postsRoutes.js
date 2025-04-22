import express from "express";
import {
  createPost,
  deletePost,
  getPosts,
  // getPostsByUserId,
  getSavedPosts,
  makeSavedPost,
  toggleLike,
  updatePost,
} from "../controllers/postsController.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/saved-posts", protectRoute, getSavedPosts);
router.post("/create", protectRoute, createPost);
router.put("/update", protectRoute, updatePost);
router.delete("/delete/:postId", protectRoute, deletePost);
router.post("/like", protectRoute, toggleLike);
router.post("/save-post", protectRoute, makeSavedPost);
// router.get("/:userId", getPostsByUserId);
export default router;
