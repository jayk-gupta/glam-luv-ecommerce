const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: String, required: true }, // ID from the API
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number, default: 1 },
  addedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
