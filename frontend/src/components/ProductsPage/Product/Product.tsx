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

/*
id
brand
name
price
price_sign
currency
image_links
product_link
website_link
description
category
product_type
tag_list
api_featured_image
product_colors
*/ 
const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  brand,
  img_url,
  price,
  category,
  product_api_url,
  product_colors,
  product_type,
}) => {
  return (
    <div
      key={id}
      className="border rounded-lg p-4 shadow-md flex flex-col items-center text-center"
    >
      <img
        src={img_url}
        alt={name}
        className="w-32 h-32 object-cover rounded-lg mb-4"
      />
      <p className="text-sm text-gray-500">{brand}</p>
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-sm text-gray-400">{category}</p>
      <p className="text-sm text-gray-500 mb-2">{product_type}</p>
      <p className="text-primary font-bold">{`$${price}`}</p>
      {/* Product Colors */}
      <div className="flex gap-2 mt-2">
        {product_colors.map((color, index) => (
          <div
            key={index}
            className="w-6 h-6 rounded-full border border-gray-300"
            style={{ backgroundColor: color.hex_value }}
            title={color.colour_name}
          ></div>
        ))}
      </div>
      <a
        href={product_api_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-sm text-blue-500 hover:underline"
      >
        View Product
      </a>
    </div>
  );
};

export default ProductCard;
