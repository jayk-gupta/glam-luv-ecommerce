
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState} from "../../../redux/store";

import ProductCard from "../Product/ProductCard";
import { useEffect } from "react";
import { fetchProducts } from "../../../redux/productsSlice";

function Products() {
 const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
 useEffect(() => {
   // Fetch products with the filter brand=maybelline
   dispatch(fetchProducts({ product_type: "lipstick" }));
 }, [dispatch]);


  return (
    <div>
      <h2 className="text-4xl py-4 font-bold">All Products</h2>
      {/* Show a loading spinner if data is being fetched */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div>
            <div className="flex justify-center items-center py-10">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
              <p className="pl-12">Loading...</p>
            </div>
          </div>
        </div>
      ) : error ? (
        // Show an error message if fetching fails
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              brand={product.brand}
              img_url={product.api_featured_image}
              price={product.price}
              category={product.category}
              product_api_url={product.product_api_url}
              product_colors={product.product_colors}
              product_type={product.product_type}
              id={product.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
