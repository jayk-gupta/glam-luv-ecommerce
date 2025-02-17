import mongoose, { Document, Schema } from "mongoose";

// Define the interface for a product
export interface IProduct extends Document {
  id: number;
  brand: string;
  name: string;
  price: string;
  price_sign: string;
  currency: string;
  image_link: string;
  product_link: string;
  website_link: string;
  description: string;
  rating: number | null;
  category: string;
  product_type: string;
  tag_list: string[];
  created_at: Date;
  updated_at: Date;
  product_api_url: string;
  api_featured_image: string;
  product_colors: { hex_value: string; colour_name: string }[];
}

// Define the schema
const ProductSchema = new Schema<IProduct>(
  {
    id: Number,
    brand: String,
    name: String,
    price: String,
    price_sign: String,
    currency: String,
    image_link: String,
    product_link: String,
    website_link: String,
    description: String,
    rating: Number,
    category: String,
    product_type: String,
    tag_list: [String],
    created_at: Date,
    updated_at: Date,
    product_api_url: String,
    api_featured_image: String,
    product_colors: [
      {
        hex_value: String,
        colour_name: String,
      },
    ],
  },
  { collection: "test" }
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
