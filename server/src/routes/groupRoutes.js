import express from "express";
import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroupById,
  updateGroupInfo,
  getGroupMembers,
  leaveGroup,
  addAdminGroup,
  joinGroup,
  sendMessage,
} from "../controllers/groupController.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();
router.post("/create", protectRoute, createGroup);
router.get("/", protectRoute, getAllGroups);
router.get("/:groupId", protectRoute, getGroupById);
router.put("/update-info", protectRoute, updateGroupInfo);
router.post("/join", protectRoute, joinGroup);
router.post("/add-admin", protectRoute, addAdminGroup);
router.get("/members/:groupId", protectRoute, getGroupMembers);
router.post("/leave", protectRoute, leaveGroup);
router.delete("/delete", protectRoute, deleteGroup);
router.post("/send", protectRoute, sendMessage);
export default router;
