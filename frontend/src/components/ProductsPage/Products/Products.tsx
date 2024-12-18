import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import ProductCard from "../Product/ProductCard";
import { fetchProducts } from "../../../redux/productsSlice";
import { Link,useLocation } from "react-router-dom";
import styles from "./products.module.css";



function Products() {
  const { state } = useLocation();
  const title: string | undefined = state?.title;

  const dispatch = useDispatch<AppDispatch>();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  // Fetch products on mount or title change
  useEffect(() => {
    if (title) {
      dispatch(fetchProducts({ product_type: title }));
    }
  }, [title, dispatch]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-10">
          <div className={styles.loadingSpinner}></div>
          <p className="pl-12">Loading...</p>
        </div>
      );
    }
    if (error) {
      return <p className="text-red-500 text-center">Error: {error}</p>;
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
