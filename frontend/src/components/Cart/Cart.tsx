import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
} from "@/redux/cart/cartAPI";
import { Button } from "../ui/button";
import { useMemo } from "react";

function Cart() {
  const { data, isLoading } = useGetCartQuery();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const total = useMemo(() => {
    return (
      data?.items.reduce((acc, item) => {
        const price = item.product?.price || 0;
        return acc + price * item.quantity;
      }, 0) || 0
    );
  }, [data]);

  if (isLoading) return <p>Loading cart...</p>;
  if (!data || data.items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      <div className="space-y-4">
        {data.items.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center justify-between border p-4 rounded-md"
          >
            <div>
              <h3 className="font-semibold">{item.product.name}</h3>
              <p>₹ {item.product.price}</p>
              <p className="text-sm text-muted-foreground">
                Quantity: {item.quantity}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() =>
                  updateCartItem({
                    productId: item.product._id,
                    quantity: item.quantity + 1,
                  })
                }
              >
                +
              </Button>
              <Button
                onClick={() =>
                  updateCartItem({
                    productId: item.product._id,
                    quantity: item.quantity - 1,
                  })
                }
                disabled={item.quantity <= 1}
              >
                -
              </Button>
              <Button
                variant="destructive"
                onClick={() => removeFromCart({ productId: item.product._id })}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <h4 className="text-lg font-semibold">Total: ₹ {total}</h4>
        <Button className="mt-4 bg-black text-white">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
