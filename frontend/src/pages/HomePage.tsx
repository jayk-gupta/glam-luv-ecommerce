import Categories from "../components/ProductsPage/ShopByCategory/Categories";
import Reviews from "../components/HomePage/Reviews";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="  ">
      <Link to="/products">
        <img
          src="/LAG_holiday_shine_collection_web_desktop_banner_2.jpeg"
          className="md:w-full"
        />
      </Link>
      <div className="flex flex-col justify-center items-center">
        <Categories />
        <Link to="/products">
          <img src="/LAG_lip_haze_web_desktop_banner_2.jpg" />
        </Link>
        <Reviews />
      </div>
    </div>
  );
}

export default HomePage;
