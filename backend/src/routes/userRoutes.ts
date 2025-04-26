import {
  deleteProfile,
  getProfile,
  updateProfile,
} from "../controllers/userController";
import { jwtAuthMiddleware } from "../jwt";

const express = require("express");
const router = express.Router();

router.get("/get", jwtAuthMiddleware, getProfile);
router.patch("/update", jwtAuthMiddleware, updateProfile);
router.delete("/delete", jwtAuthMiddleware, deleteProfile);

export default router;
