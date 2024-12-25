
import Categories from "../components/ProductsPage/ShopByCategory/Categories";
import TagUsBanner from "../components/HomePage/TagUs Banner/TagUsBanner";
import Reviews from "../components/HomePage/Reviews";


function HomePage() {

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
