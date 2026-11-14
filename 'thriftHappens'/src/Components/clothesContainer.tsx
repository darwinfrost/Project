import type { ClothingProduct } from "../data/data.ts";
import type { ProductInfo } from './thriftApp.tsx';
import type { CartItem } from './thriftApp.tsx';
import ClothesCard from './clothesCard.tsx';

// This component arranges cards and connects catalog items to their current state.
// It forwards actions to FruitsApp rather than implementing state updates itself.
interface ProductContainerProps {
  data: ClothingProduct[];
  productInfo: ProductInfo[];
  // Container callbacks include the ID because they can update any fruit.
  handleAdjustQuantity: (id: number, delta: number) => void;
  handleChangePrice: (id: number, price: number) => void;
  // Unlike quantity/price callbacks, this accepts the complete cart snapshot.
  handleAddToCart: (cartItem: CartItem) => void;
}

// React supplies one props object; destructuring extracts its named properties.
export default function clothesContainer({
  data,
  productInfo,
  handleAdjustQuantity,
  handleChangePrice,
  handleAddToCart,
}: ProductContainerProps) {
  return (
    <div className="clothesContainer">
      {data.map((clothingProduct) => {
        // Match by stable ID rather than assuming the arrays have the same order.
        const info = productInfo.find((info) => info.id === clothingProduct.id);
        // Avoid rendering a card with undefined state if no matching entry exists.
        if (!info) return null;

        // key lets React track each card across list renders; it is not a card prop.
        // {...fruit} forwards catalog fields. The callbacks capture this fruit's ID,
        // so the card only supplies a quantity change or selected price.
        // Add to Cart is forwarded unchanged: the card constructs its snapshot.
        return (
          <ClothesCard
            key={clothingProduct.id}
            {...clothingProduct}
            productInfo={info}
            handleQuantityAdjust={(delta) =>
              handleAdjustQuantity(clothingProduct.id, delta)
            }
            handlePriceChange={(price) => handleChangePrice(clothingProduct.id, price)}
            handleAddToCart={handleAddToCart}
          />
        );
      })}
    </div>
  );
}
          // <ProductCard
          //   key={fruit.id}
          //   {...fruit}
          //   productInfo={info}
          //   handleQuantityAdjust={(delta) =>
          //     handleAdjustQuantity(fruit.id, delta)
          //   }
          //   handlePriceChange={(price) => handleChangePrice(fruit.id, price)}
          //   handleAddToCart={handleAddToCart}
          // />


          //           <clothesCard
          //   key={clothingProduct.id}
          //   {...clothingProduct}
          //   productInfo={info}
          //   handleQuantityAdjust={(delta) =>
          //     handleAdjustQuantity(clothingProduct.id, delta)
          //   }
          //   handlePriceChange={(price) => handleChangePrice(clothingProduct.id, price)}
          //   handleAddToCart={handleAddToCart}
          // />