app.post("/api/cart", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const response = await fetch(`https://api.example.com/products/${productId}`);
  const product = await response.json();

  const cartItem = new CartItem({
    userId,
    productId,
    productName: product.name,
    price: product.price,
    quantity,
  });

  await cartItem.save();
  res.json({ success: true, message: "Item added to cart" });
});

app.put("/api/cart/:id", async (req, res) => {
  const { quantity } = req.body;
  const cartItem = await CartItem.findByIdAndUpdate(req.params.id, {
    quantity,
  });
  res.json(cartItem);
});

app.delete("/api/cart/:id", async (req, res) => {
  await CartItem.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
