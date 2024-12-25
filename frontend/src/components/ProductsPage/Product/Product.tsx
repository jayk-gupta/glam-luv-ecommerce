// import { RootState } from "../../../redux/store";
import { useParams } from "react-router-dom";
import styles from "./product.module.css";
import ProductColors from "./ProductColors";
import ProductValue from "./product value/ProductValue";
import { useGetProductsQuery } from "../../../redux/productsSlice";

function Product() {
  const { id } = useParams<{ id: string }>();
  const { data: products, isLoading, error } = useGetProductsQuery({});

  const product = products?.find((prod) => prod.id === parseInt(id || "", 10));

  if (!product) return <p>No product details available.</p>;
  if (isLoading) return <p>Loading product details...</p>;
  if (error) return <p>Error fetching product details.</p>;

  return (
    <div className="flex   justify-center mt-24  mb-32 gap-32 w-full">
      <div>
        <img
          src={product.api_featured_image}
          className="object-center max-h-[700px]  rounded-lg p-2"
          alt={product.name}
        />
      </div>

      {/* product details */}
      <div className={styles.content}>
        <h2 className="text-4xl font-bold">
          <span className="pr-2">{product.brand}</span>
          {product.name}
        </h2>
        <p className="text-xl">
          {product.price_sign}
          {product.price}
        </p>
        {/* <p>Category: {product.category}</p>
        <p>Type: {product.product_type}</p> */}

        <div className="product-colors ">
          <ProductColors colors={product.product_colors} />
        </div>
        <div className="product-actions flex gap-12 items-center mb-12">
          <ProductValue />
          <button className={styles.Btn}>Add to Bag</button>
        </div>
        <p className="text-lg">{product.description}</p>
      </div>
    </div>
  );
}

export default Product;
