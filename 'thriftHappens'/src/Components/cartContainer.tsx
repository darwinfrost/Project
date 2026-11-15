import type { CartItem } from './thriftApp.tsx';
import CartCard from './cartCard';


interface CartContainerProps {
  cartData: CartItem[];
}

export default function CartContainer({ cartData }: CartContainerProps) {
  return (
    <div className="CartContainer">
      <h1>Cart</h1>
      {cartData.map((item) => (
        <CartCard key={item.id} {...item} />
      ))}
      <h2>
        {cartData.length > 0
          ? `Cart Total: ${cartData.reduce((acc, item) => acc + item.total, 0).toFixed(2)}$`
          : "Cart is empty"}
      </h2>
    </div>
  );
}