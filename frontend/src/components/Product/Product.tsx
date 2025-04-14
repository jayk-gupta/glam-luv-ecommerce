import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/productsSlice"; // Adjust import path
import styles from "./product.module.css";
import ProductColors from "./ProductColors";
import ProductCartValue from "./ProductCartValue";
const Product = () => {
  const { id } = useParams<{ id: string }>(); // Get product ID from URL
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id!);

  if (isLoading) return <p>Loading product details...</p>;
  if (isError || !product) return <p>Product not found!</p>;
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
          <ProductCartValue />
          <button
            className="w-full bg-primary text-white border-2 rounded-lg border-primary  hover:bg-white hover:text-primary py-2 my-4
        sm:text-sm xl:py-1 xl:text-sm 2xl:text-lg"
          >
            Add to Bag
          </button>
        </div>
        <p className="text-lg">{product.description}</p>
      </div>
    </div>
  );
};

export default Product;
