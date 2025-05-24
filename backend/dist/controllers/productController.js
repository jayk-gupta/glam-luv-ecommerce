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
exports.getProducts = exports.getProductById = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const mongoose_1 = __importDefault(require("mongoose"));
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Validate if the ID is a valid ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }
        const product = yield Product_1.default.findById(id);
        return res.json(product);
    }
    catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getProductById = getProductById;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product_type, category, brand, tag_list, page = "1" } = req.query;
        console.log(product_type);
        const matchFilter = {};
        if (category && typeof category === "string") {
            matchFilter.category = category;
        }
        if (brand && typeof brand === "string") {
            matchFilter.brand = brand;
        }
        if (product_type && typeof product_type === "string") {
            matchFilter.product_type = product_type;
        }
        if (tag_list) {
            const tagArray = Array.isArray(tag_list) ? tag_list : [tag_list];
            matchFilter.tag_list = { $all: tagArray };
        }
        const pageNumber = parseInt(page) || 1;
        const limit = 10;
        const skip = (pageNumber - 1) * limit;
        const products = yield Product_1.default.aggregate([
            {
                $match: matchFilter,
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
            {
                $project: {
                    _id: 1,
                    brand: 1,
                    name: 1,
                    price: 1,
                    category: 1,
                    product_type: 1,
                    tag_list: 1,
                    api_featured_image: 1,
                },
            },
        ]);
        if (products.length === 0) {
            return res
                .status(404)
                .json({ message: "No products found with given filters" });
        }
        const totalProducts = yield Product_1.default.countDocuments(matchFilter);
        const totalPages = Math.ceil(totalProducts / limit);
        return res.json({
            products,
            currentPage: pageNumber,
            totalPages,
        });
    }
    catch (error) {
        console.error("Error fetching filtered products:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getProducts = getProducts;
