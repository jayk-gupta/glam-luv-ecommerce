const express = require("express")
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../controllers/cartController";
import { jwtAuthMiddleware } from "../jwt";
const router = express.Router()

router.get("/",jwtAuthMiddleware,getCart)
router.post("/add",jwtAuthMiddleware,addToCart)
router.patch("/update",jwtAuthMiddleware,updateCartItem)
router.delete("/remove",jwtAuthMiddleware, jwtAuthMiddleware, removeFromCart);
router.delete("/clear",jwtAuthMiddleware,clearCart)
 

module.exports = router

