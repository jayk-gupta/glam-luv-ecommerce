"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../jwt");
const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
router.get("/get", jwt_1.jwtAuthMiddleware, userController.getProfile);
router.patch("/update", jwt_1.jwtAuthMiddleware, userController.updateProfile);
router.delete("/delete", jwt_1.jwtAuthMiddleware, userController.deleteProfile);
module.exports = router;
