import express from "express";
import {
  acceptFriend,
  addFriend,
  getAllUsers,
  getFriendRequests,
  getFriends,
  rejectFriend,
  removeFriend,
} from "../controllers/friendsControllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", protectRoute, getFriends);
router.post("/add-friend", protectRoute, addFriend);
router.post("/accept-friend", protectRoute, acceptFriend);
router.post("/reject-friend", protectRoute, rejectFriend);
router.get("/get-all-users", protectRoute, getAllUsers);
router.get("/get-requests", protectRoute, getFriendRequests);
router.delete("/remove-friend/:friendId", protectRoute, removeFriend)
export default router;
