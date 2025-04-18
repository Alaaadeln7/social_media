import { ERROR, FAILED, SUCCESS } from "../config/statusText.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import userNotifications from "../models/notificationsModel.js";
import Notification from "../models/notificationItemModel.js"
import UserNotifications from "../models/notificationsModel.js";
export const getNotifications = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const limit = parseInt(req.query.limit) || 20;
    const skip = parseInt(req.query.skip) || 0;
    const existingNotifications = await userNotifications.findOne({ user: userId })
      .populate({
        path: "content",
        select: "text type seen createdAt notifcator",
        options: { sort: { createdAt: -1 } }
      })

    if (!existingNotifications) {
      return res.status(404).json({ status: FAILED, message: "No notifications found" });
    }

    return res.status(200).json({ status: SUCCESS, data: existingNotifications });
  } catch (error) {
    console.error("Error in getNotifications:", error.message);
    return res.status(500).json({ status: "ERROR", message: "Internal Server Error" });
  }
});
export const makeNotificationSeen = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;
  try {

    const existingNotification = await Notification.findById(notificationId);
    if (!existingNotification) {
      return res.status(404).json({
        status: ERROR,
        message: "Notification not found",
      });
    }

    await Notification.findByIdAndUpdate(notificationId, {
      seen: true,
    });

    return res.status(200).json({
      status: SUCCESS,
      message: "Notification marked as seen successfully",
    });

  } catch (error) {
    console.error("Error making notification seen:", error.message);
    return res.status(500).json({
      status: ERROR,
      message: "Internal Server Error",
    });
  }
});
export const makeAllNotificationsSeen = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const userNotifications = await UserNotifications.findOne({ user: userId });

    if (!userNotifications || !userNotifications.content.length) {
      return res.status(404).json({
        status: FAILED,
        message: "No notifications found",
      });
    }

    await Notification.updateMany(
      { _id: { $in: userNotifications.content }, seen: false },
      { $set: { seen: true } }
    );

    return res.status(200).json({
      status: SUCCESS,
      message: "All notifications marked as seen",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: ERROR,
      message: "Internal Server Error",
    });
  }
});

