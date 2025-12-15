import express from "express";
import { loginUser, signupUser } from "../controllers/user.js";

const router = express.Router();

// Login route
router.post("/login", loginUser);

// Signup route
router.post("/signup", signupUser);

export default router;
