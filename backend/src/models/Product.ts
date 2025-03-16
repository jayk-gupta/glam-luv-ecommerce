import mongoose, { Document, Schema, Types } from "mongoose";

// Define the interface for a product
export interface IProduct extends Document {
  _id: Types.ObjectId,
  brand: string;
  name: string;
  price: string;
  currency: string;
  description: string;
  category: string;
  product_type: string;
  tag_list: string[];
  api_featured_image: string;
  product_colors: { hex_value: string; colour_name: string }[];
}

// Define the schema
const ProductSchema = new Schema<IProduct>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    brand: String,
    name: String,
    price: String,
    currency: String,
    description: String,
    category: String,
    product_type: String,
    tag_list: [String],
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


ProductSchema.index({ product_type: 1 });

const Product = mongoose.model<IProduct>("Product", ProductSchema);
export default Product;
