import express, { query, Request, Response, Router } from "express";
import Product from "../models/Product";
import mongoose from "mongoose";

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
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
    const { product_type, category, brand, tag_list, page = "1" } = req.query;

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
    const pageNumber = parseInt(page as string) || 1;
    const limit = 10;
    const skip = (pageNumber - 1) * limit;
    const products = await Product.aggregate([
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

    const totalProducts = await Product.countDocuments(matchFilter);
    const totalPages = Math.ceil(totalProducts / limit);

    return res.json({
      products,
      currentPage: pageNumber,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
