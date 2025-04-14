import { VscAccount } from "react-icons/vsc";
import { IoBagOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import CategoriesNav from "./CategoriesNav";
import { useState } from "react";

function Navbar() {
  const [showCategories, setShowCategories] = useState(false);

  // Handlers for mouse events
  const handleMouseEnter = () => setShowCategories(true);
  const handleMouseLeave = () => setShowCategories(false);

  return (
    <>
      <nav className="bg-secondary flex justify-between p-4 items-center lg:text-2xl md:w-full md:text-xl md:justify-around">
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
              className="hover:cursor-pointer hover:text-primary"
              onMouseEnter={handleMouseLeave}
              to="/about"
            >
              About
            </Link>
            <div
              className="hover:cursor-pointer hover:text-primary"
              onMouseEnter={handleMouseEnter}
            >
              Products
            </div>
            <Link
              className="hover:cursor-pointer hover:text-primary"
              onMouseEnter={handleMouseLeave}
              to="/contact"
            >
              Contact Us
            </Link>
          </ul>
        </div>
        <div className="flex px-4 gap-2">
          <Link to="/login">
            <VscAccount aria-label="Account" />
          </Link>
          <IoBagOutline aria-label="Cart" />
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
