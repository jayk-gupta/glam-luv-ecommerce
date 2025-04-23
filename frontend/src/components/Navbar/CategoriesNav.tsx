import { useNavigate } from "react-router-dom";
type CategoriesNavProps = {
  closeCategoryNav: (value: boolean) => void;
};
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
  {
    category: "Nails",
    products: [{ ui: "Nail Polish", api: "nail_polish" }],
  },
];
function CategoriesNav({ closeCategoryNav }: CategoriesNavProps) {
  const navigate = useNavigate();

  const handleCategoryClick = (product: { ui: string; api: string }) => {
    closeCategoryNav(false);
    navigate("/products", { state: { title: product.api } });
  };
  //   navigate(`/products/${category}/${subCategory}`);
  return (
    <div className="absolute bg-white z-10 flex justify-center h-80 items-center w-full">
      <div className="nav flex gap-32">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <h4
              className="text-xl font-bold mb-6  hover:border-b-2 hover:border-primary hover:cursor-pointer duration-200   border-b-2 border-white
            cursor-pointer"
              style={{ width: "fit-content" }}
            >
              {category.category}
            </h4>
            <ul className="flex flex-col gap-4">
              {category.products.map((product) => (
                <li
                  className="hover:border-b-2 hover:border-primary hover:cursor-pointer duration-200 border-b-2 border-white"
                  style={{ width: "fit-content" }}
                  onClick={() => handleCategoryClick(product)}
                >
                  {product.ui}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesNav;
