import { Request,Response } from "express";
import Cart from "../models/Cart"
//////////////////////////////////////////////////////////
// GET CART
export const getCart = async (req: any, res: Response){
    try {
        const userId = req.userPayload.userId
        // find user cart
        const cart = await Cart.findOne({
            user: userId
        }).populate("items.product", "name price api_featured_image");
        
        if (!cart) return res.status(200).json({ items: [] });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch cart", details: error })
    }
}
//////////////////////////////////////////////////////////
// ADD TO CART

export const addToCart = async (req:any, res:Response) => {
    try {
        // userid get from jwt ,may be
        const userId = req.userPayload.userId 
        // payload these two
        const { productId, quantity = 1 } = req.body 
        // find user cart
        let cart = await Cart.findOne({ user: userId })
        // if no cart then create cart
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }
        // if item already exists in cart then increase quantity
        const existingItem = cart.items.find(item => item.product?.toString() == productId)
        if (existingItem) {
             existingItem.quantity += quantity;
        }
        // else push item to cart
        else {
             cart.items.push({product:productId,quantity})
        }
        // save cart
        await cart.save();
        res.status(200).json({messgae:"Cart updated"},cart)
        }catch (error) {
        res.status(200).json({message: "Failed to add to cart",details: error})
    }
    //////////////////////////////////////////////////////////
    // Update Cart
}