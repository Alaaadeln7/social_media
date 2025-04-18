import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getNotifications, makeAllNotificationsSeen, makeNotificationSeen } from "../controllers/notificationsController.js";
const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.get("/seen/:notificationId", protectRoute, makeNotificationSeen)
router.get("/all-seen", protectRoute, makeAllNotificationsSeen)

export default router;