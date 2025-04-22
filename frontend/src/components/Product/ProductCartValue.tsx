

interface Props {
  quantity: number
  setQuantity: (value: number) => void 
}

const ProductCartValue: React.FC<Props> = ({quantity,setQuantity}) => {

    const maxValue = 10
    const minValue = 0;

const handleIncrement = () => quantity < maxValue && setQuantity(quantity + 1);

const handleDecrement = () => quantity > minValue && setQuantity(quantity - 1);

  return (
    <div className="flex gap-6 items-center text-xl border-2 py-2 px-4 rounded-lg">
      <button onClick={handleDecrement} className="text-2xl cursor-pointer">-</button>
      <p>{quantity}</p>
      <button onClick={handleIncrement} className="text-2xl cursor-pointer">+</button>
    </div>
  );
};
export default ProductCartValue