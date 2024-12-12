const categories = [
  {
    category: "Face",
    products: ["Blush", "Bronzer", "Foundation"],
  },
  {
    category: "Eyes",
    products: ["Eyebrow", "Eyeliner", "Eyeshadow", "Mascara"],
  },
  {
    category: "Lips",
    products: ["Lip liner", "Lipstick"],
  },
  {
    category: "Nails",
    products: ["Nail Polish"],
  },
];
function CategoriesNav() {
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
              {category.products.map((product, index) => (
                <li
                  className="hover:border-b-2 hover:border-primary hover:cursor-pointer duration-200 border-b-2 border-white"
                  style={{ width: "fit-content" }}
                >
                  {product}
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
