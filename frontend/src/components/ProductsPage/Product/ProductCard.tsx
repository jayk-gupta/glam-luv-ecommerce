import React from "react";

interface ProductCardProps {
  id: number;
  name: string;
  brand: string;
  img_url: string;
  price: string;
  category: string;
  // product_colors: { hex_value: string; colour_name: string }[]; // Assuming structure from API
  product_type: string;
  api_featured_image:string
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  brand,
  img_url,
  price,
  category,
}) => {
  return (
    <div
      key={id}
      className="bg-white rounded-lg p-4 shadow-md flex justify-between flex-col gap-2"
    >
      <img src={img_url} alt={name} className=" object-center rounded-lg p-2" />
      <div className="content">
        <h3 className="font-bold capitalize xl: text-sm">
          {brand} <span>{name}</span>
        </h3>
        <p className="text-sm text-gray-700">{category}</p>
        <p className="text-primary font-bold">{`$${price}`}</p>
        <button
          className="w-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white py-2 my-4
        sm:text-sm xl:py-1 xl:text-sm 2xl:text-lg
        
        "
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
