import type { ClothingProduct } from "../data/data.ts";
import type { ProductInfo } from './thriftApp.tsx';
import type { CartItem } from './thriftApp.tsx';
import ClothesCard from './clothesCard.tsx';


interface ProductContainerProps {
  data: ClothingProduct[];
  productInfo: ProductInfo[];
  
  handleAdjustQuantity: (id: number, delta: number) => void;
  handleChangePrice: (id: number, price: number) => void;
 
  handleAddToCart: (cartItem: CartItem) => void;
}


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
       
        const info = productInfo.find((info) => info.id === clothingProduct.id);
        
        if (!info) return null;

       
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