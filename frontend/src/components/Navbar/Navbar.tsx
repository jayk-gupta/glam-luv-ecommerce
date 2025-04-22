import { VscAccount } from "react-icons/vsc";
import { IoBagOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import CategoriesNav from "./CategoriesNav";
import { useState } from "react";
import { useGetCartQuery } from "@/redux/cart/cartAPI";

const navItemStyle =
  "hover:cursor-pointer hover:text-[#E80071] uppercase text-xl font-semibold";

function Navbar() {
  const [showCategories, setShowCategories] = useState(false);
  const { data, isLoading, error } = useGetCartQuery();
  const quantity = data?.items.length || 0;
  // Handlers for mouse events
  const handleMouseEnter = () => setShowCategories(true);
  const handleMouseLeave = () => setShowCategories(false);

  return (
    <>
      <nav className="bg-[#FFEAF6] flex justify-between p-4 items-center lg:text-2xl md:w-full md:text-xl md:justify-around">
        <Link to="/">
          <div
            className="lg:text-4xl text-primary md:text-2xl text-lg"
            onMouseEnter={handleMouseLeave}
          >
            Glam Luv
          </div>
        </Link>

        <div className="flex items-center">
          <ul className="flex gap-4 text-sm sm:text-lg lg:text-2xl">
            <Link
              className={navItemStyle}
              onMouseEnter={handleMouseLeave}
              to="/about"
            >
              About
            </Link>
            <div className={navItemStyle} onMouseEnter={handleMouseEnter}>
              Products
            </div>
            <Link
              className={navItemStyle}
              onMouseEnter={handleMouseLeave}
              to="/contact"
            >
              Contact Us
            </Link>
          </ul>
        </div>
        <div className="flex px-4 gap-2">
          <Link to="/login">
            <VscAccount className="text-3xl" aria-label="Account" />
          </Link>
     
            <Link to="/cart" className="relative ">
              <IoBagOutline className="text-3xl" aria-label="Cart" />
              <div className="text-sm absolute bg-white left-4 bottom-4 px-2 rounded-full">
                {quantity}
              </div>
            </Link>
          </div>
      </nav>

      {/* Categories Navigation */}
      {showCategories && (
        <div className="" onMouseLeave={handleMouseLeave}>
          <CategoriesNav closeCategoryNav={setShowCategories} />
        </div>
      )}
    </>
  );
}

export default Navbar;
