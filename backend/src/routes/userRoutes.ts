import { getProfile } from "../controllers/userController"
import { jwtAuthMiddleware } from "../jwt"

const express = require("express")
const router = express.Router()

router.get("/profile", jwtAuthMiddleware, getProfile)

export default router;
