import React from "react";
import { VscAccount } from "react-icons/vsc";
import { IoBagOutline } from "react-icons/io5";
import styles from "./navbar.module.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className={styles.navbarContainer}>
      <Link to="/">
        <div className={styles.logo}>Glam Luv</div>
      </Link>

      <div className={styles.navigation}>
        <ul className={styles.navLinks}>
          <Link to="/about">About</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact Us</Link>
        </ul>
      </div>
      <div className={styles.iconWrapper}>
        <Link to="/login">
          <VscAccount aria-label="Account" />
        </Link>
        <IoBagOutline aria-label="Cart" />
      </div>
    </nav>
  );
}

export default Navbar;
