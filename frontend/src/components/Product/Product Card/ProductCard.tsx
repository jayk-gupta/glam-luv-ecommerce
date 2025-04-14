import React from "react";
interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    brand: string;
    api_featured_image: string;
    price: string;
    category: string;
    product_type: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { _id, name, brand, api_featured_image, price } = product;
  return (
    <div
      key={_id}
      className=" bg-white rounded-lg p-4 shadow-md flex justify-between flex-col gap-2;"
    >
      <img
        src={api_featured_image}
        alt={name}
        className="object-center h-80 rounded-lg p-2;"
      />
      <div className="content">
        <h3 className="font-bold capitalize  h-12  text-sm">
          {brand} <span>{name}</span>
        </h3>
        <p className="text-primary font-bold;">{`$${price}`}</p>
        <button
          className=" w-full bg-white border-2 border-primary
   text-primary hover:bg-primary hover:text-white py-2 my-4
        sm:text-sm xl:py-1 xl:text-sm 2xl:text-lg;"
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
