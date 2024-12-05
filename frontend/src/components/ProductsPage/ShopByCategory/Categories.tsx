import React from "react";

const images = [
  {
    title: "Face",
    src: "/categories/face-banner-1.jpg", // Corrected the file path
  },
  {
    title: "Eyes",
    src: "/categories/eyes-banner-1.jpg", // Corrected the file path
  },
  {
    title: "Lips",
    src: "/categories/lips-banner-1.jpg", // Corrected the file path
  },
  {
    title: "Nails",
    src: "/categories/nails-banner-1.jpg", // Corrected the file path
  },
];

function Categories() {
  return (
    <div className="categories mb-12">
      <h2 className="text-4xl py-6 font-bold text-center">Shop by Category</h2>
      <div className="flex gap-4">
        {images.map((img) => (
          <div className="rounded-lg relative" key={img.title}>
            <img className="rounded-lg" src={img.src} alt={img.title} />
            <p className="px-4 absolute top-2 left-0 bg-primary text-white rounded-r-full"> {img.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
