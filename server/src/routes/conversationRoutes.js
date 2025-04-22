import express from "express";

const router = express.Router();

import {
  blockUser,
  createConversation,
  deleteConversation,
  getConversation,
  getConversations,
  muteNotificationsMessages,
  removeChatContent,
  sendMessage,
  // uploadRecord,
} from "../controllers/conversationController.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../config/cloudinary.js";
router.post("/create", protectRoute, createConversation);
router.get("/", protectRoute, getConversations);
// router.post("/upload-record", upload.single("audio"), uploadRecord);
router.post("/send-message", protectRoute, sendMessage);
router.get("/block", protectRoute, blockUser);
router.get("/mute", protectRoute, muteNotificationsMessages);
router.get("/remove-content", protectRoute, removeChatContent);
router.delete("/:conversationId", protectRoute, deleteConversation);
router.get("/:conversationId", protectRoute, getConversation);
export default router;
