import { jwtAuthMiddleware } from "../jwt";

const express = require("express")
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/get", jwtAuthMiddleware, userController.getProfile);
router.patch("/update", jwtAuthMiddleware, userController.updateProfile);
router.delete("/delete", jwtAuthMiddleware, userController.deleteProfile);

module.exports = router;
