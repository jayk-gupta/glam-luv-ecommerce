import { VscAccount } from "react-icons/vsc";
import { IoBagOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import CategoriesNav from "./CategoriesNav";
import { useState } from "react";
import { useGetCartQuery } from "@/redux/cart/cartAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Button } from "../ui/button";
import { CrossOutline } from "../Icons/Icons";
import { openLogoutDialog } from "@/redux/user/dialogSlice";
import styles from "./navbar.module.css"

const navItemStyle =
  "hover:cursor-pointer hover:text-[#E80071] uppercase text-xl font-semibold";

function Navbar() {
  const [showCategories, setShowCategories] = useState(false);
  const authTrigger = useSelector((state: RootState) => state.auth.authTrigger);
  const { data } = useGetCartQuery(authTrigger);
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [showAccountOptions, setshowAccountOptions] = useState(false);
  const quantity = data?.items.length || 0;
  // Handlers for mouse events
  const handleMouseEnter = () => setShowCategories(true);
  const handleMouseLeave = () => setShowCategories(false);

  return (
    <>
      <nav className="bg-[#FFEAF6] flex justify-between py-4 items-center lg:text-2xl md:w-full md:text-xl md:px-12">
        <Link to="/">
          <div
            className={`lg:text-4xl text-primary md:text-2xl text-lg ${styles.logo}`}
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
            <Link to="/products">
              <div className={navItemStyle} onMouseEnter={handleMouseEnter}>
                Products
              </div>
            </Link>

            <Link
              className={navItemStyle}
              onMouseEnter={handleMouseLeave}
              to="/contact"
            >
              Contact Us
            </Link>
          </ul>
        </div>
        <div className="flex px-4 gap-2 relative">
          {!isAuthenticated ? (
            <Link to="/login">
              <VscAccount
                className="text-3xl"
                aria-label="Account"
              />
            </Link>
          ) : (
            <VscAccount
              onClick={() => {
                setshowAccountOptions((prev) => !prev);
              }}
              className="text-3xl"
              aria-label="Account"
            />
          )}

          {/* account, logout box */}
          {isAuthenticated ? (
            <div
              className={`
         ${
           showAccountOptions
             ? "opacity-100 scale-100 pointer-events-auto"
             : "opacity-0 scale-95 pointer-events-none"
         }
            flex absolute  top-10 right-16 flex-col text-lg bg-white py-4 px-4
           transition duration-500 
            `}
            >
              <Button
                variant="ghost"
                className="
              cursor-pointer"
              >
                <Link
                  to="/account"
                  className="text-sm"
                  onClick={() => {
                    setshowAccountOptions(false);
                  }}
                >
                  Account
                </Link>
              </Button>
              <CrossOutline
                className="absolute right-2 top-2 cursor-pointer text-sm "
                onClick={() => {
                  setshowAccountOptions(false);
                }}
              />
              <Button
                variant="ghost"
                className="cursor-pointer"
                onClick={() => {
                  dispatch(openLogoutDialog());
                  setshowAccountOptions(false);
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <></>
          )}

          {/* cart */}
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
