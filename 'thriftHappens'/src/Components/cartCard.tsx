import type { CartItem } from './thriftApp.tsx';

interface CartCardProps extends CartItem {
  handleRemove: () => void;
}

export default function CartCard({
  name,
  price,
  quantity,
  total,
  image,
  handleRemove,
}: CartCardProps) {
  return (
    <div className="CartCard">
      <img src={image} alt={name} height="100px" />
      <h2>{name}</h2>
      <p>quantity: {quantity}</p>
      <p>price: {price.toFixed(2)}$</p>
      <p>total: {total.toFixed(2)}$</p>
      <button onClick={handleRemove}>Remove from cart</button>
    </div>
  );
}
