import { SUCCESS } from "../config/statusText.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import Group from "../models/groupModel.js";
import Message from "../models/messageModel.js";
export const createGroup = asyncHandler(async (req, res) => {
  const { name, image, description } = req.body;
  const userId = req.user._id;
  const group = await Group.create({
    name,
    image,
    description,
    admins: [userId],
    users: [userId],
  });
  await group.save();
  return res.status(200).json({ status: SUCCESS, data: { group } });
});
export const joinGroup = asyncHandler(async (req, res) => {
  const { userId, groupId } = req.body;
  const group = await Group.findById(groupId);
  if (!group) {
    return res
      .status(404)
      .json({ status: "error", message: "Group not found" });
  }
  group.users.push(userId);
  await group.save();
  return res.status(200).json({ status: SUCCESS, data: { group } });
});
export const addAdminGroup = asyncHandler(async (req, res) => {
  const { userId, groupId } = req.body;
  const group = await Group.findById(groupId);
  if (!group) {
    return res
      .status(404)
      .json({ status: "error", message: "Group not found" });
  }
  group.admins.push(userId);
  await group.save();
  return res.status(200).json({ status: SUCCESS, data: { group } });
});
export const getAllGroups = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const groups = await Group.find({ users: { $all: [userId] } });
  return res.status(200).json({ status: SUCCESS, data: { groups } });
});
export const leaveGroup = asyncHandler(async (req, res) => {
  const { userId, groupId } = req.body;
  const group = await Group.findById(groupId);
  if (!group) {
    return res
      .status(404)
      .json({ status: "error", message: "Group not found" });
  }
  group.users.pull(userId);
  await group.save();
  if (group.admins.includes(userId)) {
    group.admins.pull(userId);
    await group.save();
  }
  return res.status(200).json({ status: SUCCESS, data: { group } });
});
export const deleteGroup = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const group = await Group.findByIdAndDelete(groupId);
  return res.status(200).json({
    status: SUCCESS,
    message: "Group deleted successfully",
  });
});
export const updateGroupInfo = asyncHandler(async (req, res) => {
  const { name, description, groupId } = req.body;
  const updatedGroup = await Group.findByIdAndUpdate(
    groupId,
    {
      name,
      description,
    },
    { new: true }
  );
  if (!updatedGroup) {
    return res.status(401).json({ status: ERROR, message: "Group not found" });
  }
  return res.status(200).json({ status: SUCCESS, data: { updatedGroup } });
});
export const getGroupById = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const group = await Group.findById(groupId);
  if (!group) {
    return res
      .status(404)
      .json({ status: "error", message: "Group not found" });
  }
  return res.status(200).json({ status: SUCCESS, data: { group } });
});
export const getGroupMembers = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const group = await Group.findById(groupId).populate(
    "users",
    "fullName avatar lastSeen"
  );
  if (!group) {
    return res.status(404).json({ status: ERROR, message: "Group not found" });
  }
  return res
    .status(200)
    .json({ status: SUCCESS, data: { members: group.users } });
});
export const sendMessage = asyncHandler(async (req, res) => {
  const sender = req.user._id;
  const { content, image, record, groupId } = req.body;
  let imageUrl;
  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "blogs",
    });
    imageUrl = uploadResponse.secure_url;
  }
  const newMessage = new Message({ sender, content, image: imageUrl, record });
  await newMessage.save();
  const group = await Group.findById(groupId);
  group.messages.push(newMessage._id);
  await group.save();
  return res.status(200).json({ status: SUCCESS, data: { group } });
});
