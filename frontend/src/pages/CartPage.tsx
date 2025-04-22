import Cart from "@/components/Cart/Cart"
import { useGetCartQuery } from "@/redux/cart/cartAPI"

function CartPage() {
  const { data, isLoading, error } = useGetCartQuery()
  console.log(data)
  if (isLoading) return <p>Loading cart...</p>;
  if (error) return <p>Something went wrong loading your cart.</p>;
  return (
    <div className="border flex flex-col ">
      <h2 className="text-xl font-bold mb-4 px-4  ">🛒 Your Cart</h2>
      <Cart items={data?.items || []} />
    </div>
  );
}

export default CartPage