import { jwtAuthMiddleware } from "../jwt";

const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
// Step 1: Start signup by sending OTP to email
router.post("/signup/start", authController.startSignup); // expects { email }

// Step 2: Verify OTP
router.post("/verify-otp", authController.verifyOtp); // expects { email, otp }

// Step 3: Complete signup (set password, other info)
router.post("/signup/complete", authController.completeSignup); // expects { email, password, name, phone }

// Login route
router.post("/login", authController.login); // expects { email, password }

router.get("/me", jwtAuthMiddleware, authController.getMe);
module.exports = router;
