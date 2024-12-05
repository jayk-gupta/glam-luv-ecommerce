import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../../redux/store'
import { fetchProducts } from '../../../redux/productsSlice'
import ProductCard from '../Product/ProductCard'

function Products() {
  const dispatch = useDispatch<AppDispatch>()
  const { products, filters, loading, error } = useSelector((state: RootState) => state.products)
  
  useEffect(() => {
    dispatch(fetchProducts(filters))
  },[dispatch,filters])

  return (
    <div>
      <h2 className='text-4xl py-4 font-bold'>All Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            brand={product.brand}
            img_url={product.api_featured_image}
            price={product.price}
            category={product.category}
            product_api_url={product.product_api_url}
            product_colors={product.product_colors}
            product_type={product.product_type}
            id={product.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Products