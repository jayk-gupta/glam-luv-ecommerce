import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';

function Product() {
  const { id } = useParams<{ id: string }>()
  const product = useSelector((state: RootState) => state.products.products.find((product) => product.id === Number(id))
  )

  if (!product) {
    return <p>No product details available.</p>;
  }
  return (
    <div>
      <h2 className="text-4xl font-bold">{product.name}</h2>
      <img src={product.api_featured_image} alt={product.name} />
      <p>Brand: {product.brand}</p>
      <p>Price: {product.price}</p>
      <p>Category: {product.category}</p>
      <p>Type: {product.product_type}</p>
    </div>
  );
}

export default Product