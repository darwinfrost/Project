import type { ClothingProduct } from '../data/data.ts';
import type { ProductInfo } from './thriftApp.tsx';
import type { CartItem } from './thriftApp.tsx';


interface clothesCardProps extends ClothingProduct {
  name: string;
  price: number;
  image: string;
  productInfo: ProductInfo;
  handleQuantityAdjust: (delta: number) => void;
  handlePriceChange: (price: number) => void;
  handleAddToCart: (cartItem: CartItem) => void;
}


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
      <select
        name="price"
        value={productInfo.price}
        onChange={(e) => handlePriceChange(parseFloat(e.target.value))}
      >
        /* Keep numeric option values separate from their two-decimal labels.
            Prices serve as keys here, assuming options are unique per fruit. */
      </select>
      <br />
      <button onClick={() => handleQuantityAdjust(-1)}>{" - "}</button>
      <span>{productInfo.quantity}</span>
      <button onClick={() => handleQuantityAdjust(1)}>{" + "}</button>
      <p>
        Total Price: {(productInfo.quantity * productInfo.price).toFixed(2)}$
      </p>
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