import React from 'react'
import Categories from '../components/ProductsPage/ShopByCategory/Categories';

function HomePage() {
  return (
    <div>
      <img src="public/LAG_holiday_shine_collection_web_desktop_banner_2.jpeg" />
      <div className='flex justify-center'>
        <Categories />
      </div>
    </div>
  );
}

export default HomePage