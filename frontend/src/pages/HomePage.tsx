import React from 'react'
import Categories from '../components/ProductsPage/ShopByCategory/Categories';
import TagUsBanner from '../components/HomePage/TagUs Banner/TagUsBanner';
import Reviews from '../components/HomePage/Reviews';

function HomePage() {
  return (
    <div>
      <img src="public/LAG_holiday_shine_collection_web_desktop_banner_2.jpeg" />
      <div className='flex flex-col justify-center items-center'>
        <Categories />
        <Reviews/>
        <TagUsBanner/>
      </div>
    </div>
  );
}

export default HomePage