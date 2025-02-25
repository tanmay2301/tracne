import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser); // Register new user
router.post("/login", loginUser); // Login user
router.get("/profile", protect, getUserProfile); // Get user profile (protected route)

export default router;
