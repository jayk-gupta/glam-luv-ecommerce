import React from "react";

interface ProductCardProps {
  id: number;
  name: string;
  brand: string;
  img_url: string;
  price: string;
  category: string;
  product_api_url: string;
  product_colors: { hex_value: string; colour_name: string }[]; // Assuming structure from API
  product_type: string;
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
      className="bg-white rounded-lg p-4 shadow-md flex flex-col gap-2"
    >
      <img
        src={img_url}
        alt={name}
        className="h-96 object-center rounded-lg mb-4"
      />
      <h3 className="font-bold capitalize">{brand} <span>{name}</span></h3>
      <p className="text-sm text-gray-700">{category}</p>
      <p className="text-primary font-bold">{`$${price}`}</p>
    <button className="w-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white py-2 my-4">Add to Bag</button>
    </div>
  );
};

export default ProductCard;
