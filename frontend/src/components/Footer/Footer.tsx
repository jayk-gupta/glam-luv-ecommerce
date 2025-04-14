import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="lg:px-48 lg:pt-12 flex flex-col bg-secondary md:p-6 sm:py-6 py-2">
      <div className="flex pb-12 sm:flex-col md:flex-row sm:items-center flex-col gap-12 items-center">
        {/* Subscribe Section */}
        <section className="flex flex-col sm:gap-6 gap-4 lg:w-[40rem] md:w-1/2 px-12">
          <h3 className="text-2xl font-bold">Get 15% OFF</h3>
          <p>Your first order & get our latest promotions!</p>
          <div className="flex flex-col gap-4 items-start">
            <input
              type="email"
              className="bg-white border-2 lg:p-4 w-full p-2"
              placeholder="Enter your email"
              aria-label="Email address"
            />
            <button className="bg-[#EB008B] w-full lg:p-4 p-2 text-white font-bold uppercase">
              Subscribe
            </button>
          </div>
          <p className="text-sm w-full">
            By subscribing to Glam Luv Cosmetics, you agree to receive marketing
            messages and understand your information will be collected and used
            subject to our Privacy Policy and Terms of Use. You may unsubscribe
            at any time.
          </p>
        </section>

        {/* Links Section */}
        <section className="flex lg:gap-32 md:gap-6 sm:gap-12 sm:mt-6 flex-col items-center gap-12 md:flex-row md:items-start">
          <div>
            <h4 className="font-bold text-xl mb-4 text-center">
              Customer Service
            </h4>
            <ul className="flex flex-col gap-2 items-center">
              <Link to="/contact">Contact Us</Link>
              <Link to="">Shipping Policy</Link>
              <Link to="">Return Policy</Link>
              <Link to="">FAQs</Link>
              <Link to="">My Account</Link>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-4 text-center">Explore</h4>
            <ul className="flex flex-col gap-2 items-center">
              <Link to="/about">Our Story</Link>
              <Link to="">Join Our Team</Link>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-4 text-center">Featured</h4>
            <ul className="flex flex-col gap-2 items-center">
              <Link to="">Eyeshadow Collections</Link>
              <Link to="">Best Sellers</Link>
              <Link to="">New Arrivals</Link>
            </ul>
          </div>
        </section>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col items-center gap-2">
        <ul className="border-y-[0.1px] border-gray-400 sm:py-4 w-full flex justify-center text-[0.8rem] py-2 px-4 gap-4 sm:text-sm">
          <Link to="">Privacy Policy</Link>
          <Link to="">Terms & Conditions</Link>
          <Link to="">Terms of Use</Link>
          <Link to="">Terms of Service</Link>
          <Link to="">Legal Disclaimer</Link>
        </ul>
        <div className="flex flex-col items-center">
          {/* Add Social Media Icons Here */}
          <div className="">{/* Icons can go here */}</div>
          <p className="sm:text-sm text-[0.6rem]">
            © 2024 GLAM LUV COSMETICS. ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
