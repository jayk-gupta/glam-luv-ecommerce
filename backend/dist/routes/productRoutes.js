"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../models/Product"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_type } = req.query;
        console.log("Product type filter:", product_type);
        // Ensure product_type is provided
        if (!product_type || typeof product_type !== "string") {
            return res.status(400).json({ message: "Product type is required" });
        }
        const productsByType = yield Product_1.default.aggregate([
            {
                $match: { product_type },
            },
            {
                $project: {
                    _id: 1,
                    brand: 1,
                    name: 1,
                    price: 1,
                    category: 1,
                    product_type: 1,
                    description: 1,
                    tag_list: 1,
                    api_featured_image: 1,
                    product_colors: 1,
                },
            },
            // {
            //   $group: {
            //     _id: "$product_type",
            //     products: { $push: "$$ROOT" },
            //   },
            // },
        ]);
        console.log(productsByType);
        if (productsByType.length === 0) {
            return res
                .status(404)
                .json({ message: "No products found for this type" });
        }
        return res.json(productsByType);
    }
    catch (error) {
        console.error("Error fetching test products:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.default = router;
