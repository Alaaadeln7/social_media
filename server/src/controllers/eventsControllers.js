import asyncHandler from "../middlewares/asyncHandler.js";
import { ERROR, FAILED, SUCCESS } from "../config/statusText.js"
import Event from "../models/eventsModel.js";
import UserNotifications from "../models/notificationsModel.js";
export const getEevents = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    const existEvents = await Event.findOne({ user: userId });
    if (!existEvents) {
      return res.status(404).json({ status: FAILED, message: "Events Not Found" })
    }
    return res.status(200).json({
      status: SUCCESS,
      message: "get events successfully",
      data: existEvents
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", status: ERROR })
  }
});

export const createEvent = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { title, description, date } = req.body;

  try {
    let userEvents = await Event.findOne({ user: userId });

    const newEvent = { title, description, date };

    if (!userEvents) {
      userEvents = await Event.create({
        user: userId,
        events: [newEvent],
      });
    } else {
      userEvents.events.push(newEvent);
      await userEvents.save();
    }
    // make notification
    const notification = {
      notifcator: null,
      type: "event",
      text: "You have a new event",
    }
    const userNotifications = await UserNotifications.findOne({ user: userId });
    if (!userNotifications) {
      await UserNotifications.create({
        user: userId,
        content: [notification],
      });
    } else {
      userNotifications.content.push(notification);
      await userNotifications.save();
    }
    return res.status(200).json({
      status: SUCCESS,
      message: "Event created successfully",
      data: userEvents,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: ERROR,
      message: "Internal Server Error",
    });
  }
});

export const deleteEvent = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { eventId } = req.params;

  try {
    const userEvents = await Event.findOne({ user: userId });

    if (!userEvents) {
      return res.status(404).json({
        status: FAILED,
        message: "User events not found",
      });
    }

    const updatedEvents = userEvents.events.filter(
      (event) => event._id.toString() !== eventId
    );

    userEvents.events = updatedEvents;

    await userEvents.save();

    return res.status(200).json({
      status: SUCCESS,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: ERROR, message: "Internal Server Error" });
  }
});
export const updateEvent = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { eventId } = req.params;
  const { title, description, date } = req.body;
  try {
    const userEvents = await Event.findOne({ user: userId });
    if (!userEvents) {
      return res.status(404).json({ status: FAILED, message: "User events not found" });
    }
    const updatedEvents = userEvents.events.map((event) => {
      if (event._id.toString() === eventId) {
        event.title = title;
        event.description = description;
        event.date = date;
      }
      return event;
    });
    userEvents.events = updatedEvents;
    await userEvents.save();
    return res.status(200).json({ status: SUCCESS, message: "Event updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: ERROR, message: "Internal Server Error" });
  }
})
