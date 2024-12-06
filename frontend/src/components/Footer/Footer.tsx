
import styles from "./footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.header}>
        {/* Subscribe Section */}
        <section className={styles.subscribe}>
          <h3 className={styles.subscribeTitle}>Get 15% OFF</h3>
          <p className={styles.subscribeText}>
            Your first order & get our latest promotions!
          </p>
          <div className={styles.subscribeForm}>
            <input
              type="email"
              className={styles.subscribeInput}
              placeholder="Enter your email"
              aria-label="Email address"
            />
            <button className={styles.subscribeButton}>Subscribe</button>
          </div>
          <p className={styles.privacyText}>
            By subscribing to Glam Luv Cosmetics, you agree to receive marketing
            messages and understand your information will be collected and used
            subject to our Privacy Policy and Terms of Use. You may unsubscribe
            at any time.
          </p>
        </section>

        {/* Links Section */}
        <section className={styles.links}>
          <div className={styles.customerService}>
            <h4 className={styles.linksTitle}>Customer Service</h4>
            <ul className={styles.linksList}>
              <Link to="/contact">Contact Us</Link>
              <Link to="">Shipping Policy</Link>
              <Link to="">Return Policy</Link>
              <Link to="">FAQs</Link>
              <Link to="">My Account</Link>
            </ul>
          </div>
          <div className={styles.explore}>
            <h4 className={styles.linksTitle}>Explore</h4>
            <ul className={styles.linksList}>
              <Link to="/about">Our Story</Link>
              <Link to="">Join Our Team</Link>
            </ul>
          </div>
          <div className={styles.featured}>
            <h4 className={styles.linksTitle}>Featured</h4>
            <ul className={styles.linksList}>
              <Link to="">Eyeshadow Collections</Link>
              <Link to="">Best Sellers</Link>
              <Link to="">New Arrivals</Link>
            </ul>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <div className={styles.footerBottom}>
        <ul className={styles.policyLinks}>
          <Link to="">Privacy Policy</Link>
          <Link to="">Terms & Conditions</Link>
          <Link to="">Terms of Use</Link>
          <Link to="">Terms of Service</Link>
          <Link to="">Legal Disclaimer</Link>
        </ul>
        <div className={styles.socialMedia}>
          {/* Add Social Media Icons Here */}
          <div className={styles.icons}></div>
          <p className={styles.copyright}>
            © 2024 GLAM LUV COSMETICS. ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
