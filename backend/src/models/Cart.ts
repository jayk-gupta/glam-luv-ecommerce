import { Schema, Types } from "mongoose";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  brand: string;
  name: string;
  price: string;
  category: string;
  product_type: string;
  api_featured_image: string;
}

const cartSchema = new Schema<IProduct>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  brand: String,
  name: String,
  price: String,
  api_featured_image: String,
});
