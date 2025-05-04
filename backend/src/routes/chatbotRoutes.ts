import { analyzeImage, getChatbot } from "../controllers/chatbotController";
import { jwtAuthMiddleware } from "../jwt";

const express = require("express");
const router = express.Router();

router.post("/chat", jwtAuthMiddleware, getChatbot);
router.post("/analyzeImage", jwtAuthMiddleware, analyzeImage);
module.exports = router