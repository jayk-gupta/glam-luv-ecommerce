
const productController = require("../controllers/productController")

import express from "express";
const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);


module.exports = router;
