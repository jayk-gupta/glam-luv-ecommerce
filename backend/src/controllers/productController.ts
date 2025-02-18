import express, { query, Request, Response, Router } from "express";
import Product from "../models/Product";


export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Product id is required" });
    }
    const product = await Product.findById(id);
    return res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const {product_type, category, brand, tag_list } = req.query;

    const matchFilter: any = {};
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

    const products = await Product.aggregate([
      {
        $match: matchFilter,
      },
      {
        $limit: 10,
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

    return res.json(products);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
