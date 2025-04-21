import { getChatbot } from "../controllers/chatbotController";
import { jwtAuthMiddleware } from "../jwt";

const express = require("express");
const router = express.Router();

router.post("/",jwtAuthMiddleware, getChatbot);
module.exports = router