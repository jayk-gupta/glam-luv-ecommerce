"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const https = require("https");
// Read SSL certificate and key
const privateKey = fs.readFileSync("/home/ubuntu/ssl/server.key", "utf8");
const certificate = fs.readFileSync("/home/ubuntu/ssl/server.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };
const allowedOrigins = [
    "http://localhost:5173",
    "https://ecom-frontend-swart.vercel.app/",
];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            // Allow requests with no origin (like curl or Postman)
            callback(null, true);
        }
        else if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("CORS not allowed for this origin"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express_1.default.json());
require("dotenv").config();
// app.use("/products", productRoutes);
app.get("/", (req, res) => {
    res.send("homepage");
});
// app.use("/api/products", productRoutes);
// CONFIGURATIONS
const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.PASSWORD;
////////////////////////////////////////////////////////////
// DATABASE CONNECTION
const mongoURL = `mongodb+srv://jay:${PASSWORD}@cluster0.qgs52h0.mongodb.net/GlamLuv`;
mongoose_1.default
    .connect(mongoURL)
    .then(() => console.log("Connected to MongoDB server"))
    .catch((err) => console.error("MongoDB connection error", err));
///////////////////////////////////////////////////////////
// ROUTES
// product routes
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
// user routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
// chatbot
const chatbotRoutes = require("./routes/chatbotRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/user/profile", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/chatbot", chatbotRoutes);
//////////////////////////////////////////////////
app.listen(PORT, () => {
    console.log("app is running on port 3000");
});
