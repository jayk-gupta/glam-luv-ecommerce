import { jwtAuthMiddleware } from "../jwt";

const express = require("express")
const userController = require("../controllers/userController");
const router = express.Router()
// Step 1: Start signup by sending OTP to email
router.post("/signup/start", userController.startSignup); // expects { email }

// Step 2: Verify OTP
router.post("/verify-otp", userController.verifyOtp); // expects { email, otp }

// Step 3: Complete signup (set password, other info)
router.post("/signup/complete", userController.completeSignup); // expects { email, password, name, phone }

// Login route
router.post("/login", userController.login); // expects { email, password }

router.get("/me",jwtAuthMiddleware, userController.getMe)
module.exports = router;
          