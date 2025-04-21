import { Request, Response } from "express";
interface AuthRequest extends Request {
  userPayload: {
    userId: string;
  };
}
import Cart from "../models/Cart";
//////////////////////////////////////////////////////////
// GET CART
export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userPayload.userId;
    // find user cart
    const cart = await Cart.findOne({
      user: userId,
    }).populate("items.product", "name price api_featured_image");

    if (!cart) return res.status(200).json({ items: [] });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart", details: error });
  }
};
//////////////////////////////////////////////////////////
// ADD TO CART

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    // userid get from jwt ,may be
    const userId = req.userPayload.userId;
    // payload these two
    const { productId, quantity = 1 } = req.body;
    console.log(productId, quantity);
    // find user cart
    let cart = await Cart.findOne({ user: userId });
    // if no cart then create cart
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }
    // if item already exists in cart then increase quantity
    const existingItem = cart.items.find(
      (item) => item.product?.toString() == productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    }
    // else push item to cart
    else {
      cart.items.push({ product: productId, quantity });
    }
    // save cart
    await cart.save();
    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    res.status(200).json({ message: "Failed to add to cart", details: error });
  }
};
//////////////////////////////////////////////////////////
// Update Cart
export const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userPayload.userId;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ user: userId });
    // if cart does not exist
    if (!cart) return res.json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product?.toString() == productId
    );

    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ message: "Quantity updated", cart });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update item ",
      details: error,
    });
  }
};
/////////////////////////////////////////////////////////////////
// DELETE/REMOVE

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userPayload.userId;
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.set(
      "items",
      cart.items.filter((item) => item.product?.toString() !== productId)
    );
    await cart.save();

    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item", details: error });
  }
};

export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userPayload.userId;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(400).json({ message: "Cart not found" });

    //   empty cart
    cart.set("items", []);
    await cart.save();
    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear cart", details: error });
  }
};

