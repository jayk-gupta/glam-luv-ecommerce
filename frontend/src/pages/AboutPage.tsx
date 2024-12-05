import React from "react";

function AboutPage() {
  return (
    <div className="flex flex-col items-center mb-12">
      <img src="/public/about us/about_us_model.jpg" className="mb-12" />
      <div className="container ">
        <div className="1 flex ">
          <img src="public/about us/about_us_img_2.jpg" className="w-1/2" />
          <div className="content flex flex-col items-center justify-center">
            <h3 className="text-4xl font-semibold">About Us</h3>
            <p className="px-12 py-6 text-center">
              Glam Luv Cosmetics is all about bringing artistry to life by
              providing prestige-quality color cosmetics to all makeup users
              alike - from the savvy beauty junkie to the inspired novice.
            </p>
          </div>
        </div>
        <div className="1 flex">
          <div className="content  flex flex-col items-center justify-center">
            <h3 className="text-4xl font-semibold">Love Inspiring Beauty</h3>
            <p className="px-12 py-6 text-center">
              As an affordable luxury cosmetics brand, Glam Luv Cosmetics loves
              to INSPIRE beauty by creating new ways to ignite individual
              expression thru the art of color. We’re a chic and savvy
              professional makeup brand that places the power of artistry in the
              hands of today’s aspiring makeup user.
            </p>
          </div>
          <img
            src="public/about us/love_inspiring_beauty.jpg"
            className="w-1/2"
          />
        </div>
        <div className="content flex">
          <img src="public/about us/foundation_for_all.jpg" className="w-1/2" />
          <div className="content  flex flex-col items-center justify-center">
            <h3 className="text-4xl font-semibold">Beauty for All</h3>
            <p className="px-12 py-6 text-center">
              Glam Luv Cosmetics has taken pride in offering on-trend,
              innovative, and exceptional quality products. With an amazing
              selection of high-quality cosmetic products that cater to makeup
              enthusiasts all over the world, L.A. Girl has become a destination
              brand that offers beauty without compromise.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
