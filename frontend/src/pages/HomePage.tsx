import { useEffect } from "react";
import Categories from "../components/ProductsPage/ShopByCategory/Categories";
import TagUsBanner from "../components/HomePage/TagUs Banner/TagUsBanner";
import Reviews from "../components/HomePage/Reviews";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

import { fetchProducts } from "../redux/productsSlice";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { filters } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);
  return (
    <div className="  ">
      <img
        src="/LAG_holiday_shine_collection_web_desktop_banner_2.jpeg"
        className="md:w-full"
      />
      <div className="flex flex-col justify-center items-center">
        <Categories />
        <img src="/LAG_lip_haze_web_desktop_banner_2.jpg" />
        <Reviews />
        <TagUsBanner />
      </div>
    </div>
  );
}

export default HomePage;
