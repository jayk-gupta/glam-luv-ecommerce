import ProductSideNav from "@/components/ProductsPage/Products/SideNavMenu/ProductsSideNav";
import Products from "../components/ProductsPage/Products/Products";

function ProductsPage() {
  return (
    <div className=" pb-12 flex gap-12  bg-gray-100">
      <ProductSideNav />
      <Products />
    </div>
  );
}

export default ProductsPage;
