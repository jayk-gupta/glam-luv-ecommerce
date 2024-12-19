import { useState } from "react";

const ProductValue: React.FC = () => {
  const [itemValue, setItemValue] = useState(0);
    const maxValue = 10
    const minVlaue = 0;
  const handleIncrement = () => setItemValue((prevValue) => prevValue >= maxValue ? prevValue : prevValue + 1);
  const handleDecrement = () => setItemValue((prevValue) => prevValue <= minVlaue ? prevValue : prevValue - 1);

  return (
    <div className="flex gap-6 items-center text-xl border-2 py-2 px-4 rounded-lg">
      <button onClick={handleDecrement} className="text-2xl">-</button>
      <p>{itemValue}</p>
      <button onClick={handleIncrement} className="text-2xl">+</button>
    </div>
  );
};
export default ProductValue