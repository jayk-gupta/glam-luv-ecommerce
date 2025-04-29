import { useLocation, useNavigate } from "react-router-dom";

const categories = [
  {
    category: "Face",
    products: [
      { ui: "Blush", api: "blush" },
      { ui: "Bronzer", api: "bronzer" },
      { ui: "Foundation", api: "foundation" },
    ],
  },
  {
    category: "Eyes",
    products: [
      { ui: "Eyebrow", api: "eyebrow" },
      { ui: "Eyeliner", api: "eyeliner" },
      { ui: "Eyeshadow", api: "eyeshadow" },
      { ui: "Mascara", api: "mascara" },
    ],
  },
  {
    category: "Lips",
    products: [
      { ui: "Lip Liner", api: "lip_liner" },
      { ui: "Lipstick", api: "lipstick" },
    ],
  },
  { category: "Nails", products: [{ ui: "Nail Polish", api: "nail_polish" }] },
];

function ProductSideNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentSubcategory = location.pathname.split("/")[3]

  const handleClick = (
    category: string,
    product: { ui: string; api: string }
  ) => {
    const categorySlug = category.toLowerCase();
    const productSlug = product.api.toLowerCase();
    navigate(`/products/${categorySlug}/${productSlug}`, {
      state: { title: product.api,label:product.ui },
    });
  };

  return (
      <div className="w-64 bg-white flex flex-col gap-8  h-screen  px-6 py-4">
          <h3 className="text-2xl font-semibold border-b border-gray-400 py-4">Categories</h3>
      {categories.map((category) => (
        <div key={category.category} className="mb-6">
          <h4 className="text-xl font-bold mb-2">{category.category}</h4>
          <ul className="space-y-1">
            {category.products.map((product) => (
              <li
                key={product.api}
                onClick={() => handleClick(category.category, product)}
                    className={`cursor-pointer text-md hover:text-primary
                 ${currentSubcategory === product.api ? "text-primary font-semibold" : "hover:text-primary"}`} >
                {product.ui}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ProductSideNav;
