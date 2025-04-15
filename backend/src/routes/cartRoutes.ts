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
router.patch("/update",updateCartItem)
router.delete("/remove",removeFromCart)
router.delete("/clear",clearCart)
 

module.exports = router

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2ZiOTg4NDI2ZDkzZmFlNTM1Y2UzMGMiLCJlbWFpbCI6ImpheWsuanN4QGdtYWlsLmNvbSIsImlhdCI6MTc0NDcyODY3MiwiZXhwIjoxNzQ0OTAxNDcyfQ.VzbykQjH08IeA1DQtWMYgsuHmBNfNFZXbNj6-noOFoA