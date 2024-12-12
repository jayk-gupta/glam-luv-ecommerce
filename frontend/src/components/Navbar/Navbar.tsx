import { VscAccount } from "react-icons/vsc";
import { IoBagOutline } from "react-icons/io5";
import styles from "./navbar.module.css";
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
      <nav className={styles.navbarContainer}>
        <Link to="/">
          <div className={styles.logo}>Glam Luv</div>
        </Link>

        <div className={styles.navigation}>
          <ul className={styles.navLinks}>
            <Link className={styles.navlink} to="/about">
              About
            </Link>
            <div
              className={styles.navlink}
              onMouseEnter={handleMouseEnter}
            
            >
              Products
            </div>
            <Link className={styles.navlink} to="/contact">
              Contact Us
            </Link>
          </ul>
        </div>
        <div className={styles.iconWrapper}>
          <Link to="/login">
            <VscAccount aria-label="Account" />
          </Link>
          <IoBagOutline aria-label="Cart" />
        </div>
      </nav>

      {/* Categories Navigation */}
      {showCategories && (
        <div
          className={styles.categoriesNav}
     
          onMouseLeave={handleMouseLeave}
        >
          <CategoriesNav />
        </div>
      )}
    </>
  );
}

export default Navbar;
