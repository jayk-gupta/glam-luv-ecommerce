import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.json());
require("dotenv").config();

// app.use("/products", productRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("homepage");
});
// app.use("/api/products", productRoutes);

// CONFIGURATIONS
const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.PASSWORD;
// DATABASE CONNECTION
const mongoURL = `mongodb+srv://jay:${PASSWORD}@cluster0.qgs52h0.mongodb.net/GlamLuv`;

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to MongoDB server"))
  .catch((err) => console.error("MongoDB connection error", err));

// ROUTES
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/products", productRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log("app is running on port 3000");
});
