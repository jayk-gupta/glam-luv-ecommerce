import express, { Request, Response } from "express";
import productRoutes from "./routes/productRoutes";
import getAllProducts from "./routes/getAllProducts";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
require("dotenv").config();
app.use("/products", productRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("homepage");
});
// CONFIGURATIONS
const PORT = process.env.PORT || 3000;
const PASSWORD = process.env.PASSWORD;
// DATABASE CONNECTION
const mongoURL = `mongodb+srv://jay:${PASSWORD}@cluster0.qgs52h0.mongodb.net/GlamLuv`;

mongoose
  .connect(mongoURL)
  .then(() => console.log("Connected to MongoDB server"))
  .catch((err) => console.error("MongoDB connection error", err));
app.listen(5000, () => {
  console.log("app is running on port 5000");
});
