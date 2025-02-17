import Product from "../models/Product";
import express, { query, Request, Response, Router } from "express";
const router = Router();

router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { product_type } = req.query;
    console.log("Product type filter:", product_type);
    // Ensure product_type is provided
    if (!product_type || typeof product_type !== "string") {
      return res.status(400).json({ message: "Product type is required" });
    }
    const productsByType = await Product.aggregate([
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
      {
        $limit: 10,
      }
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
  } catch (error) {
    console.error("Error fetching test products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
