"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
require("dotenv").config();
app.use("/products", productRoutes_1.default);
app.get("/", (req, res) => {
    res.send("homepage");
});
// CONFIGURATIONS
const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.PASSWORD;
// DATABASE CONNECTION
const mongoURL = `mongodb+srv://jay:${PASSWORD}@cluster0.qgs52h0.mongodb.net/GlamLuv`;
mongoose_1.default
    .connect(mongoURL)
    .then(() => console.log("Connected to MongoDB server"))
    .catch((err) => console.error("MongoDB connection error", err));
app.listen(5000, () => {
    console.log("app is running on port 5000");
});
