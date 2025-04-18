import { ERROR, SUCCESS } from "../config/statusText.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../middlewares/generateToken.js";
import OTP from "../models/OtpModel.js";
import User from "../models/UserModel.js";
import cloudinary from "../config/cloudinary.js";
import { generateOTP, sendVerificationEmail } from "../utils/otpUtils.js";
import {
  loginValidationSchema,
  registerValidationSchema,
} from "../utils/validationAuth.js";
import bcrypt from "bcryptjs";
import Notification from "../models/notificationItemModel.js";
import UserNotifications from "../models/notificationsModel.js";

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, password, username } = req.body;
  const validData = await registerValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }

  const otp = generateOTP();
  await OTP.create({ email, otp, expiresAt: Date.now() + 10 * 60 * 1000 });
  req.session.tempUser = { fullName, username, email, password };
  try {
    await sendVerificationEmail(email, otp);
    res.status(200).json({ message: "OTP sent. Please verify your account." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP. Please try again." });
  }
});

export const verifyOTP = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const { email } = req.session.tempUser;
  const storedOTP = await OTP.findOne({ email });
  if (!storedOTP || storedOTP.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }
  const { fullName, password, username } = req.session.tempUser || {};
  if (!fullName || !password) {
    return res
      .status(400)
      .json({ message: "Session expired. Please register again." });
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    fullName,
    email,
    password: hashPassword,
    username,
  });
  const welcomeNote = await Notification.create({
    notifcator: null,
    type: "welcome",
    text: "welcome back in wesal",
  });
  let userNotifications = await UserNotifications.findOne({ user: newUser._id });

  if (!userNotifications) {
    userNotifications = await UserNotifications.create({
      user: newUser._id,
      content: [welcomeNote._id],
    });
  } else {
    userNotifications.content.unshift(welcomeNote._id);
    await userNotifications.save();
  }
  await newUser.save();
  generateToken(newUser._id, res);
  delete req.session.tempUser;
  await OTP.deleteOne({ email });
  req.session.destroy();

  res
    .status(201)
    .json({ message: "User verified & created successfully!", user: newUser });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const validData = await loginValidationSchema.validate(req.body, {
    abortEarly: false,
  });
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({
      status: FAILED,
      message: "Incorrect email or password",
    });
  }
  const welcomeNote = await Notification.create({
    notifcator: null,
    type: "welcome",
    text: "welcome back in wesal",
  });
  let userNotifications = await UserNotifications.findOne({ user: user._id });

  if (!userNotifications) {
    userNotifications = await UserNotifications.create({
      user: user._id,
      content: [welcomeNote._id],
    });
  } else {
    userNotifications.content.unshift(welcomeNote._id);
    await userNotifications.save();
  }
  generateToken(user._id, res);
  return res.status(200).json({ status: SUCCESS, data: { user } });
});

export const logout = asyncHandler(async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res
      .status(200)
      .json({ status: SUCCESS, message: "Logged out Successfully" });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ status: ERROR, message: "Internal Server Error" });
  }
});
export const deleteProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  await user.deleteOne();
  res.clearCookie("jwt");
  return res
    .status(200)
    .json({ status: SUCCESS, message: "Profile deleted successfully" });
});
export const checkAuth = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ status: ERROR, message: "Unauthorized" });
  }
  return res.status(200).json(req.user);
});

export const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  req.session.tempUser = { email };
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const otp = generateOTP();
  await OTP.create({ email, otp, expiresAt: Date.now() + 10 * 60 * 1000 });
  try {
    await sendVerificationEmail(email, otp);
    res.status(200).json({ message: "OTP sent. Please check your email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP. Please try again." });
  }
});
export const verifyForgetPasswordOTP = asyncHandler(async (req, res) => {
  const { email } = req.session.tempUser;
  const { otp } = req.body;
  const storedOTP = await OTP.findOne({ email });
  if (!storedOTP || storedOTP.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  } else {
    await OTP.deleteOne({ email });
    return res.status(200).json({ message: "OTP verified successfully" });
  }
});

export const updatePassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;
  const user = req.user;

  const updatePassword = await bcrypt.hash(newPassword, 10);
  user.password = updatePassword;
  await user.save();

  res
    .status(200)
    .json({ status: SUCCESS, message: "Password updated successfully" });
});
export const updateProfileInfo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { fullName, username } = req.body;
  const updateUser = await User.findByIdAndUpdate(
    userId,
    {
      fullName,
      username,
    },
    { new: true }
  );
  return res.status(200).json({
    status: SUCCESS,
    message: "Profile updated successfully",
    user: updateUser,
  });
});
export const updateProfileImage = asyncHandler(async (req, res) => {
  try {
    const { avatar } = req.body;
    const userId = req.user._id;
    if (!avatar) {
      return res
        .status(400)
        .json({ status: ERROR, message: "Profile avatar is required" });
    }
    const uploadResponse = await cloudinary.uploader.upload(avatar);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        avatar: uploadResponse.secure_url,
      },
      { new: true }
    );
    return res.status(200).json({ status: SUCCESS, data: { updateUser } });
  } catch (error) {
    console.error("Error in update avatar", error.message);
    return res
      .status(500)
      .json({ status: ERROR, message: "Internal Server Error" });
  }
});
export const getProfile = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ status: SUCCESS, data: { user } });
});
export const createBio = asyncHandler(async (req, res) => {
  const { bio } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  user.bio = bio;
  await user.save();
  return res.status(200).json({ status: SUCCESS, data: { user } });
});
