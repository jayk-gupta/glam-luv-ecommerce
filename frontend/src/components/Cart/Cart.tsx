import {
  useClearCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
} from "@/redux/cart/cartAPI";
import { Button } from "../ui/button";
import { toast } from "sonner";

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
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [clearCart] = useClearCartMutation();

  const handleUpdate = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart({ productId });
      return;
    }
    await updateCartItem({ productId, quantity });
  };
  const handleRemove = async (productId: string) => {
    try {
      await removeFromCart({ productId }).unwrap();
      toast("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  if (items.length === 0) {
    return <p className="text-center">Your cart is empty.</p>;
  }

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="px-40 flex gap-16 ">
      <div className="flex w-2/3 flex-col bg-white shadow-lg p-4">
        {items.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center gap-24  pb-4 border-b border-gray-300  p-4"
          >
            <img
              src={item.product.api_featured_image}
              alt={item.product.name}
              className="w-40 h-40 object-cover rounded"
            />
            <div className="gap-2 w-64 flex flex-col text-lg">
              <div className="truncate font-semibold">{item.product.name}</div>

              <div className="text-lg text-gray-600">Qty: {item.quantity}</div>
              <div className="text-lg font-medium">
                Price: ${item.product.price}
              </div>
            </div>
            {/*   QUANTITY */}
            <div className="quantity flex items-center gap-4 text-lg text-gray-600 ">
              <Button
                className="border px-2 text-white"
                onClick={() =>
                  handleUpdate(item.product._id, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
              >
                -
              </Button>
              <span className="font-semibold">{item.quantity}</span>
              <Button
                className="border px-2  text-white"
                onClick={() =>
                  handleUpdate(item.product._id, item.quantity + 1)
                }
              >
                +
              </Button>
            </div>
            <div>
              <Button
                className="text-white cursor-pointer"
                onClick={() => handleRemove(item.product._id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
        <div>
          <Button
            className="text-white cursor-pointer py-2 m-4"
            onClick={() => {
              clearCart();
              toast("Cart deleted successfully");
            }}
          >
            Clear Cart
          </Button>
        </div>
      </div>

      <div className=" text-lg flex flex-col justify-between shadow-xl p-4 w-80 h-90 bg-white">
        <div className="flex flex-col gap-4">
          <h4 className="font-semibold border-b border-gray-500 mb-2 text-2xl ">
            Summary
          </h4>
          <p className="text-xl">Total Items: {items.length}</p>
          <p className="text-xl">
            SubTotal: <span className="font-bold">${total.toFixed(2)}</span>
          </p>
        </div>

        <Button className="mb-4">Proceed to payment</Button>
      </div>
      <div></div>
    </div>
  );
};

export default Cart;
