import express from "express";
import {
  register,
  verifyOTP,
  login,
  logout,
  deleteProfile,
  checkAuth,
  forgetPassword,
  updatePassword,
  updateProfileInfo,
  updateProfileImage,
  verifyForgetPasswordOTP,
  getProfile,
  createBio,
} from "../controllers/authController.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.post("/delete-profile", protectRoute, deleteProfile);
router.get("/check-auth", protectRoute, checkAuth);
router.post("/forget-password", forgetPassword);
router.post("/verify-forget-password-otp", verifyForgetPasswordOTP);
router.post("/update-password", protectRoute, updatePassword);
router.put("/update-profile-info", protectRoute, updateProfileInfo);
router.put("/update-profile-image", protectRoute, updateProfileImage);
router.get("/:userId", getProfile);
router.post("/create-bio", protectRoute, createBio);
export default router;
