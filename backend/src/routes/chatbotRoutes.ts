import multer from "multer";
import { analyzeImage, getChatbot } from "../controllers/chatbotController";
import { jwtAuthMiddleware } from "../jwt";

const express = require("express");
const router = express.Router();
const upload = multer({ dest: "uploads/" });
router.post("/chat", jwtAuthMiddleware, getChatbot);
router.post("/analyzeImage", upload.single("file"), analyzeImage);
module.exports = router;
