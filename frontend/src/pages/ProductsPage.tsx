import React from "react";
import BestSellers from "../components/ProductsPage/BestSellers/BestSellers";
import Categories from "../components/ProductsPage/ShopByCategory/Categories";

function ProductsPage() {
  return (
    <div className="px-48">
      ProductsPage
      <Categories />
      <BestSellers />
    </div>
  );
}

export default ProductsPage;
