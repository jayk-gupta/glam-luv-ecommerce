// components/Cart/Cart.tsx

import { useState } from "react";
import ProductCartValue from "../Product/ProductCartValue";


interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    api_featured_image: string;
  };
  quantity: number;
}

const Cart = ({ items }: { items: CartItem[] }) => {

  if (items.length === 0) {
    return <p className="text-center">Your cart is empty.</p>;
  }

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className=" space-y-6 px-64">
      {items.map((item) => (
        <div
          key={item.product._id}
          className="flex items-center gap-4 shadow-lg pb-4 bg-[#fff1f9] p-4"
        >
          <img
            src={item.product.api_featured_image}
            alt={item.product.name}
            className="w-40 h-40 object-cover rounded"
          />
          <div className="grid grid-cols-3 gap-8 w-full items-center">
            <div className="truncate font-semibold">{item.product.name}</div>
       
            <div className="text-lg text-gray-600">Qty: {item.quantity}</div>
            <div className="text-lg font-medium">
              Price: ${item.product.price}
            </div>
          </div>
        </div>
      ))}
      <div className="text-right font-bold text-lg pt-4 border-t">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
};

export default Cart;
