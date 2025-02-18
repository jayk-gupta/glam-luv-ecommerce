import {  getProductById, getProducts } from "../controllers/productController";

const express = require("express");
const router = express.Router();

router.get("/:id", getProductById);
router.get("/",getProducts)

export default router;
