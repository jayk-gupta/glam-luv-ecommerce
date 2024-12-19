import React, { useState } from "react";

interface ProductColor {
  hex_value: string;
  colour_name: string;
}

interface ProductColorsProps {
  colors: ProductColor[];
}

const ProductColors: React.FC<ProductColorsProps> = ({ colors }) => {
  const [selectedColor, setSelectedColor] = useState(
    colors[0]?.colour_name || ""
  );

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(event.target.value);
  };

  return (
    <div>
      {/* Dropdown to select colors */}
      <div className="mb-4 w-full ">
 
        <select
          id=""
          value={selectedColor}
          onChange={handleSelectChange}
          className="w-full p-2 border bg-[#F8F8F8] rounded-lg"
        >
          {colors.map((color, index) => (
            <option key={index} value={color.colour_name}>
              <span
                className="color-swatch w-6 h-6 rounded-full border"
                style={{ backgroundColor: color.hex_value }}
                title={color.colour_name}
              ></span>
              {color.colour_name}
            </option>
          ))}
        </select>
      </div>

      {/* Display colors below */}
      <div className="flex gap-4">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`color-item flex items-center gap-2 ${
              selectedColor === color.colour_name ? "border-blue-500" : ""
            }`}
            onClick={() => setSelectedColor(color.colour_name)}
          >
            <div
              className={`p-[2px] flex items-center justify-center rounded-full ${
                selectedColor === color.colour_name
                  ? "border-gray-600 border"
                  : ""
              }`}
            >
              <div
                className="color-swatch w-6 h-6 rounded-full border"
                style={{ backgroundColor: color.hex_value }}
                title={color.colour_name}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductColors;
