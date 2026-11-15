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
      {productInfo.quantity == 0 ? <p>Out of stock</p> :
      <p>{productInfo.quantity} in stock</p>}
      <br />
      <select
        name="price"
        value={productInfo.price}
        onChange={(e) => handlePriceChange(parseFloat(e.target.value))}
      >
      </select>
      <br />
      <button disabled= {productInfo.itemQuantity == 0 || productInfo.quantity == 0} onClick={() => handleQuantityAdjust(-1)}>{" - "}</button>
      <span>{productInfo.itemQuantity}</span>
      <button disabled= {productInfo.itemQuantity == productInfo.quantity || productInfo.quantity == 0} onClick={() => handleQuantityAdjust(1)}>{" + "}</button>
      <p>
        Total Price: {(productInfo.itemQuantity * productInfo.price).toFixed(2)}$
      </p>
      <button disabled= {productInfo.itemQuantity == 0}
        onClick={() =>{
          handleAddToCart({
            id: crypto.randomUUID(),
            name: productInfo.name,
            price: productInfo.price,
            quantity: productInfo.itemQuantity,
            total: productInfo.itemQuantity * productInfo.price,
          });  productInfo.quantity -= productInfo.itemQuantity; productInfo.itemQuantity = 0;}
        }
      >
        Add to Cart
      </button>
    </div>
  );
}