import Conversation from "../models/conversationModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { ERROR, SUCCESS } from "../config/statusText.js";
// import { compressAudio } from "../config/cloudinary.js";
// import path from "path";
// import fs from "fs";
import Message from "../models/messageModel.js";
import { io, getReceiverSocketId } from "../config/socket.js";
import cloudinary from "../config/cloudinary.js";
import Notification from "../models/notificationItemModel.js";

export const getConversations = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const conversations = await Conversation.find({
    $or: [{ sender: userId }, { receiver: userId }],
  })
    .populate("sender", "fullName avatar")
    .populate("receiver", "fullName avatar")
    .populate({
      path: "messages",
      select: "content image createdAt",
      options: { sort: { createdAt: -1 }, limit: 1 },
    });

  return res.status(200).json({ status: SUCCESS, data: { conversations } });
});
export const createConversation = asyncHandler(async (req, res) => {
  const sender = req.user._id;
  const { receiver } = req.body;

  let conversation = await Conversation.findOne({
    $or: [
      { sender, receiver },
      { sender: receiver, receiver: sender },
    ],
  });

  if (!conversation) {
    conversation = new Conversation({ sender, receiver });
    await conversation.save();
  }

  return res.status(200).json({ status: SUCCESS, data: { conversation } });
});

export const getConversation = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const conversation = await Conversation.findById(conversationId)
    .populate({
      path: "messages",
      select: "record content image createdAt read",
      populate: {
        path: "sender",
        select: "fullName avatar _id",
      },
    })
    .populate("receiver", "fullName avatar")
    .populate("sender", "fullName avatar");
  if (!conversation) {
    return res
      .status(404)
      .json({ status: ERROR, message: "Conversation not found" });
  }
  const updateReadStatus = await Conversation.findByIdAndUpdate(
    conversationId,
    { read: true },
    { new: true }
  );
  io.to(conversationId).emit("markAsRead", { conversationId });
  await updateReadStatus.save();
  return res.status(200).json({ status: SUCCESS, data: { conversation } });
});

export const deleteConversation = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const conversation = await Conversation.findByIdAndDelete(conversationId);
  if (!conversation) {
    return res
      .status(404)
      .json({ status: ERROR, message: "Conversation not found" });
  }
  return res
    .status(200)
    .json({ status: SUCCESS, message: "deleted successfully" });
});

export const sendMessage = asyncHandler(async (req, res) => {
  const sender = req.user._id;
  const { content, image, record, conversationId } = req.body;
  let imageUrl;
  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "blogs",
    });
    imageUrl = uploadResponse.secure_url;
  }
  const newMessage = await Message.create({
    sender,
    content,
    image: imageUrl,
    record,
  });
  await newMessage.save();
  const conversation = await Conversation.findById(conversationId);
  conversation.messages.push(newMessage._id);
  await conversation.save();
  // when send message make notification to receiver user
  const notifcation = {
    notifcator: sender,
    type: "message",
    text: newMessage.content,
  };
  const newNotification = new Notification(notifcation);
  await newNotification.save();
  const receiverSocketId = getReceiverSocketId(conversationId);
  io.to(receiverSocketId).emit("newNotification", newNotification);
  io.to(conversationId).emit("newMessage", newMessage);
  return res.status(200).json({ status: SUCCESS, data: { conversation } });
});
// export const uploadRecord = asyncHandler(async (req, res) => {
//   const sender = req.user._id;
//   const { conversationId } = req.params;
//   if (!req.file || !req.file.path) {
//     return res.status(400).json({ message: "No audio file uploaded" });
//   }

//   const inputPath = req.file.path;
//   const outputPath = path.join("uploads", `compressed-${Date.now()}.mp3`);

//   await compressAudio(inputPath, outputPath);
//   const result = await cloudinary.v2.uploader.upload(outputPath, {
//     resource_type: "auto",
//     folder: "voice_notes",
//   });

//   fs.unlinkSync(inputPath);
//   fs.unlinkSync(outputPath);

//   const newMessage = new Message({
//     sender,
//     record: result.secure_url,
//   });
//   await newMessage.save();
//   const conversation = await Conversation.findById(conversationId);
//   conversation.messages.push(newMessage._id);
//   await conversation.save();
//   return res.status(200).json({ status: SUCCESS, data: { conversation } });
// });
// make block

export const blockUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    // the user can't can send any massages to blocked user
  } catch (error) {
    return res
      .status(500)
      .json({ status: ERROR, message: "Internal Server Error" });
  }
});
// make mute
export const muteNotificationsMessages = asyncHandler(async (req, res) => {});
// make remove chat content
export const removeChatContent = asyncHandler(async (req, res) => {});

// sync => non-blocking code (default in js)
// async => blocking code (to wait the code finish and run it in the normal place in block);
