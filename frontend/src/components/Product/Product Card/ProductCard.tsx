import React from "react";
import styles from "./productCard.module.css"
interface ProductCardProps {
  product: {
    id: number;
    name: string;
    brand: string;
    api_featured_image: string;
    price: string;
    category: string;
    product_type: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, brand, api_featured_image, price, category } = product;
  return (
    <div
      key={id}
      className={styles.productCard}
    >
      <img
        src={api_featured_image}
        alt={name}
        className={styles.productImg}
      />
      <div className="content">
        <h3 className={styles.title}>
          {brand} <span>{name}</span>
        </h3>
        <p className={styles.category}>{category}</p>
        <p className={styles.price}>{`$${price}`}</p>
        <button
          className={styles.Btn}
        >
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
