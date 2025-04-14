const express = require("express")
const userController = require("../controllers/userController");
const router = express.Router()
// Step 1: Start signup by sending OTP to email
router.post("/auth/signup/start", userController.startSignup); // expects { email }

// Step 2: Verify OTP
router.post("/auth/verify-otp", userController.verifyOtp); // expects { email, otp }

// Step 3: Complete signup (set password, other info)
router.post("/auth/signup/complete", userController.completeSignup); // expects { email, password, name, phone }

// Login route
router.post("/auth/login", userController.login); // expects { email, password }

module.exports = router;
