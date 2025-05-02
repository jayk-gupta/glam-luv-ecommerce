import Cart from "@/components/Cart/Cart"
import { useGetCartQuery } from "@/redux/cart/cartAPI"
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

function CartPage() {
  const authTrigger = useSelector((state: RootState) => state.auth.authTrigger);
  const { data, isLoading, error } = useGetCartQuery(authTrigger)

  if (isLoading) return <p>Loading cart...</p>;
  if (error) return <p>Something went wrong loading your cart.</p>;
  return (
    <div className=" flex flex-col ">
      <h2 className="text-3xl font-bold my-6 px-40  ">🛒 Your Cart</h2>
      <Cart items={data?.items || []} />
    </div>
  );
}

export default CartPage