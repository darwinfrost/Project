import type { ClothingProduct } from '../data/data.ts';
import type { ProductInfo } from './thriftApp.tsx';
import type { CartItem } from './thriftApp.tsx';

// Extend catalog fields with current state and the actions this card can request.
// These callbacks hide how the parent stores and updates its state arrays.
interface clothesCardProps extends ClothingProduct {
  name: string;
  price: number;
  image: string;
  productInfo: ProductInfo;
  handleQuantityAdjust: (delta: number) => void;
  handlePriceChange: (price: number) => void;
  handleAddToCart: (cartItem: CartItem) => void;
}

// Presentational component: render the supplied values and report interactions.
// Props are inputs; calling a callback asks FruitsApp to supply updated values.
export default function clothesCard({
  name,
  image,
  productInfo,
  handleQuantityAdjust,
  handlePriceChange,
  handleAddToCart,
}: clothesCardProps) {
  return (
    <div className="clothesCard">
      <h2>{name}</h2>
      <img src={image} alt="" height="100px" />
      <br />
      {/* Controlled select: React state determines the selected option.
          DOM input values are strings, so convert the selection to a number. */}
      <select
        name="price"
        value={productInfo.price}
        onChange={(e) => handlePriceChange(parseFloat(e.target.value))}
      >
        /* Keep numeric option values separate from their two-decimal labels.
            Prices serve as keys here, assuming options are unique per fruit. */
      </select>
      <br />
      {/* Arrow functions defer actions until a click; the parent enforces the floor. */}
      <button onClick={() => handleQuantityAdjust(-1)}>{" - "}</button>
      <span>{productInfo.quantity}</span>
      <button onClick={() => handleQuantityAdjust(1)}>{" + "}</button>
      {/* This preview derives its total from the current selection.
          toFixed(2) returns a display string; it does not change the numbers
          or apply formatting to values later passed to another component. */}
      <p>
        Total Price: {(productInfo.quantity * productInfo.price).toFixed(2)}$
      </p>
      {/* Build a snapshot only when clicked. A fresh UUID distinguishes this
          cart entry from both the fruit ID and previous entries of the same fruit.
          Keep price and total numeric for calculations; cart components format
          their own displays. Later selection changes do not alter this snapshot. */}
      <button
        onClick={() =>
          handleAddToCart({
            id: crypto.randomUUID(),
            name: productInfo.name,
            price: productInfo.price,
            quantity: productInfo.quantity,
            total: productInfo.quantity * productInfo.price,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  );
}