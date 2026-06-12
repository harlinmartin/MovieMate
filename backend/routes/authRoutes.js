import express from "express";
import {
  register,
  login,
  getMe,
  registerValidation,
  loginValidation,
} from "../controllers/authController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerValidation, register);

// POST /api/auth/login
router.post("/login", loginValidation, login);

// GET /api/auth/me (protected)
router.get("/me", protect, getMe);

export default router;
