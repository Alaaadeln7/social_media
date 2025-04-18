import express from "express";
import {
  addComment,
  deleteComment,
  makeLikeComment,
  updateComment,
} from "../controllers/commentController.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protectRoute, addComment);
router.put("/update", updateComment);
router.delete("/delete/:commentId", deleteComment);
router.post("/make-like", protectRoute, makeLikeComment);
export default router;
