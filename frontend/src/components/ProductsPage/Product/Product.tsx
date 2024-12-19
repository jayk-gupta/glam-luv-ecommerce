import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./product.module.css";
import ProductColors from "./ProductColors";
import ProductValue from "./product value/ProductValue";

function Product() {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((product) => product.id === Number(id))
  );

  if (!product) {
    return <p>No product details available.</p>;
  }
  return (
    <div className="flex  border-2 justify-center p-12  my-32 gap-32 w-full">
      <div>
        <img
          src={product.api_featured_image}
          className="object-center rounded-lg p-2"
          alt={product.name}
        />
      </div>

      {/* product details */}
      <div className={styles.content}>
        <h2 className="text-4xl font-bold">
          <span className="pr-2">{product.brand}</span>
          {product.name}
        </h2>
        <p className="text-xl">
          {product.price_sign}{product.price}
        </p>
        {/* <p>Category: {product.category}</p>
        <p>Type: {product.product_type}</p> */}

        <div className="product-colors ">
          <ProductColors colors={product.product_colors} />
        </div>
        <div className="product-actions flex gap-12 items-center mb-12">
          <ProductValue />
          <button className={styles.Btn}>Add to Bag</button>
        </div>
        <p className="">{product.description}</p>
      </div>
    </div>
  );
}

export default Product;


