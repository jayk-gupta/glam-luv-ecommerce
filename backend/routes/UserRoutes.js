const express = require("express");
const UserController = require("../controllers/UserController");
const { jwtAuthMiddleware } = require("../jwt");
const router = express.Router();

// router.get("/", jwtAuthMiddleware, UserController.getAllUsers);

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
module.exports = router;
