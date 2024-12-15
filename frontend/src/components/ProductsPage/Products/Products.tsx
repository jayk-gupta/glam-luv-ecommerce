import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import ProductCard from "../Product/ProductCard";
import { fetchProducts } from "../../../redux/productsSlice";
import { useLocation } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  brand: string;
  img_url: string;
  price: string;
  category: string;
  product_type: string;
  api_featured_image:string
}

function Products() {
  const { state } = useLocation();
  const title: string | undefined = state?.title;

  const dispatch = useDispatch<AppDispatch>();

  const products: ProductCardProps[] = useSelector(
    (state: RootState) => state.products.products
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.products.loading
  );
  const error: string | null = useSelector(
    (state: RootState) => state.products.error
  );

  // Fetch products on mount or title change
  useEffect(() => {
    if (title) {
      dispatch(fetchProducts({ product_type: title }));
    }
  }, [title, dispatch]);

  return (
    <div>
      <h2 className="text-4xl py-4 font-bold">{title}</h2>
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
        <p className="text-red-500 text-center">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: ProductCardProps) => (
            <ProductCard
              key={product.id}
              name={product.name}
              brand={product.brand}
              img_url={product.api_featured_image}
              price={product.price}
              category={product.category}
              product_type={product.product_type}
              id={product.id}
              api_featured_image={product.api_featured_image}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
