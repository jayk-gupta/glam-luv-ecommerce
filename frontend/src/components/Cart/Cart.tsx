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
    <div className=" space-y-6 px-20 flex gap-16 ">

      <div className="flex w-3/4 flex-col gap-6 bg-white shadow-lg p-4">
        {items.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center gap-4  pb-4 border-b border-gray-300  p-4"
          >
            <img
              src={item.product.api_featured_image}
              alt={item.product.name}
              className="w-40 h-40 object-cover rounded"
            />
            <div className=" items-center">
              <div className="truncate font-semibold">{item.product.name}</div>

              <div className="text-lg text-gray-600">Qty: {item.quantity}</div>
              <div className="text-lg font-medium">
                Price: ${item.product.price}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className=" text-lg shadow-xl p-4 h-64 w-64 bg-white">
        <h4 className="font-semibold border-b border-gray-500 mb-2">Summary</h4>
        <p>Total Items: {items.length}</p>
        <p>SubTotal: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
