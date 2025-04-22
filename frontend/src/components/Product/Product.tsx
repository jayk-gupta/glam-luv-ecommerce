import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/productsSlice";
import ProductColors from "./ProductColors";
import ProductCartValue from "./ProductCartValue";
import { useAddToCartMutation } from "@/redux/cart/cartAPI";
import { useState } from "react";
const Product = () => {
  const { id } = useParams<{ id: string }>(); // Get product ID from URL
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id!);

  // Add to cart
  const [addToCart, { isLoading: isLoadingCart }] = useAddToCartMutation();
  const [quantity, setQuantity] = useState(1);
  ////////////////////
  if (isLoading) return <p>Loading product details...</p>;
  if (isError || !product) return <p>Product not found!</p>;

  const handleAddCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await addToCart({
        productId: product._id,
        quantity: quantity,
      }).unwrap();

      console.log(response);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  //////////////////////////
  return (
    <div className="flex justify-center mt-24  mb-32 gap-32 w-full">
      <div>
        <img
          src={product.api_featured_image}
          className="object-center max-h-[700px]  rounded-lg p-2"
          alt={product.name}
        />
      </div>

      {/* product details */}
      <div className=" flex flex-col w-1/3 gap-6 p-2">
        <h2 className="text-4xl font-bold">
          <span className="pr-2">{product.brand}</span>
          {product.name}
        </h2>
        <p className="text-xl">{product.price}</p>
        <div className="product-colors ">
          <ProductColors colors={product.product_colors ?? []} />
        </div>
        <div className="product-actions flex gap-12 items-center mb-12">
          <ProductCartValue quantity={quantity} setQuantity={setQuantity} />
          <button
            className="w-full bg-primary text-white border-2 rounded-lg border-primary  hover:bg-white hover:text-[#E80071] py-2 my-4 cursor-pointer
        sm:text-sm xl:py-1 xl:text-sm 2xl:text-lg"
            onClick={handleAddCart}
          >
            {isLoadingCart ? "Adding..." : "Add to Bag"}
          </button>
        </div>
        <h3 className="font-semibold text-xl">About this item</h3>
        <p className="text-lg">{product.description}</p>
      </div>
    </div>
  );
};

export default Product;
