// components/Cart/Cart.tsx


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
    <div className="px-4 space-y-6">
      {items.map((item) => (
        <div
          key={item.product._id}
          className="flex items-center gap-4 border-b pb-4"
        >
          <img
            src={item.product.api_featured_image}
            alt={item.product.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{item.product.name}</h3>
            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            <p className="text-sm font-medium">Price: ${item.product.price}</p>
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
