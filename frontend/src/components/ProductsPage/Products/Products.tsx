import ProductCard from "../Product/ProductCard";
import { Link, useLocation } from "react-router-dom";
import styles from "./products.module.css";
import { useGetProductsQuery } from "../../../redux/productsSlice";

function Products() {
  const { state } = useLocation();
  const title: string | undefined = state?.title;
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGetProductsQuery({ product_type: title });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-10">
          <div className={styles.loadingSpinner}></div>
          <p className="pl-12">Loading...</p>
        </div>
      );
    }
    if (isError) {
      return (
        <p className="text-red-500 text-center">
          Error:{" "}
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      );
    }
    if (products.length === 0) {
      return <p className="text-center">No products available.</p>;
    }
    // Render products
    return (
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <ProductCard key={product.id} product={product} />
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-4xl py-4 font-bold">{title || "Products"}</h2>
      {renderContent()}
    </div>
  );
}

export default Products;
