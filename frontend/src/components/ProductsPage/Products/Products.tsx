import ProductCard from "../../Product/Product Card/ProductCard";
import { useLocation } from "react-router-dom";
import { useGetProductsQuery } from "../../../redux/productsSlice";
import { useState } from "react";

function Products() {
  const { state } = useLocation();
  const title: string | undefined = state?.title;
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useGetProductsQuery({
    product_type: title,
    page,
  });

  const products = data?.products || [];
  const currentPage = data?.currentPage || 1;
  const totalPages = data?.totalPages || 1;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-10">
          {/* loading spinner */}
          <div className="w-12 h-12 border-4 border-primary border-t-transparent border-solid rounded-full animate-spin"></div>
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
    // products conatiner
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-4xl py-4 font-bold">{title || "Products"}</h2>
      {renderContent()}

      {/* Pagination */}
      <div className="py-12 items-center justify-center flex gap-4">
        <button
          disabled={page <= 1}
          className="bg-[#EB008B] text-white p-2 rounded-sm hover:cursor-pointer hover:bg-[#ff029e]"
          onClick={() => {
            scrollToTop();
            setPage((prev) => prev - 1);
          }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} out of {totalPages}
        </span>
        <button
          className="bg-[#EB008B] text-white p-2 rounded-sm hover:cursor-pointer hover:bg-[#ff029e]"
          disabled={page >= totalPages}
          onClick={() => {
            scrollToTop();
            setPage((prev) => prev + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;


/*
import { useParams } from "react-router-dom";

const { category, subcategory } = useParams<{ category: string; subcategory: string }>();

// Use subcategory for API query
const { data, isLoading } = useGetProductsQuery({
  product_type: subcategory,
  page,
});
*/ 