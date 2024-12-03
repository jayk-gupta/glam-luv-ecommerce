import React from "react";
import styles from "./footer.module.css";

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
              <li>Contact Us</li>
              <li>Shipping Policy</li>
              <li>Return Policy</li>
              <li>FAQs</li>
              <li>My Account</li>
            </ul>
          </div>
          <div className={styles.explore}>
            <h4 className={styles.linksTitle}>Explore</h4>
            <ul className={styles.linksList}>
              <li>Our Story</li>
              <li>Join Our Team</li>
            </ul>
          </div>
          <div className={styles.featured}>
            <h4 className={styles.linksTitle}>Featured</h4>
            <ul className={styles.linksList}>
              <li>Eyeshadow Collections</li>
              <li>Best Sellers</li>
              <li>New Arrivals</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <div className={styles.footerBottom}>
        <ul className={styles.policyLinks}>
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
          <li>Terms of Use</li>
          <li>Terms of Service</li>
          <li>Legal Disclaimer</li>
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
