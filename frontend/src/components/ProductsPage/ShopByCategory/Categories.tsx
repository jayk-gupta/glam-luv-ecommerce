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
    <div className="categories">
      <h2 className="text-4xl py-6 font-bold">Shop by Category</h2>
      <div className="flex gap-4">
        {images.map((img) => (
          <div className="rounded-lg " key={img.title}>
            <img className="rounded-lg" src={img.src} alt={img.title} />
            {img.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
