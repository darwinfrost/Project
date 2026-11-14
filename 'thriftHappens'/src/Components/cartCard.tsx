import type { CartItem } from './thriftApp.tsx';

export default function CartCard({
  name,
  price,
  quantity,
  total,
}: CartItem) {
  return (
    <div className="CartCard">
      <h2>{name}</h2>
      <p>quantity: {quantity}</p>
      <p>price: {price.toFixed(2)}$</p>
      <p>total: {total.toFixed(2)}$</p>
      <button>Remove from cart</button>
    </div>
  );
}