import Product from "../models/Product";
import express, { query, Request, Response, Router } from "express";
const router = Router();

router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const allProducts = await Product.aggregate([
      {
        $match: {}, // Matches all documents
      },
    ]);
    return res.json(allProducts);
  } catch (error) {
    console.error("Error fetching test products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
