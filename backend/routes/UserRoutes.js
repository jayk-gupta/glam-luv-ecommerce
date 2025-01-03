const express = require("express");
const UserController = require("../controllers/UserController");
const { jwtAuthMiddleware } = require("../jwt");
const router = express.Router();
const multer = require("multer")
// router.get("/", jwtAuthMiddleware, UserController.getAllUsers);

// upload user image
router.post("/upload", upload.single("image"), UserController.uploadUserImage)
// Auth routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
module.exports = router;
