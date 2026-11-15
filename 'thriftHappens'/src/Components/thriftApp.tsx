import type { ClothingProduct } from '../data/data.ts';
import CartContainer from './cartContainer.tsx';
import ClothesContainer from './clothesContainer.tsx';
import { useState } from "react";

interface clothesData {
  
  data: ClothingProduct[];
}

export interface ProductInfo {
 
  id: number;
  itemQuantity: number;
  quantity: number;
  
  price: number;
  name: string,
}


export interface CartItem {
 
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export default function ThriftApp({ data }: clothesData) {
 
  const [productInfo, setProductInfo] = useState<ProductInfo[]>(() =>
    data.map((clothingProduct) => ({
      id: clothingProduct.id,
      name: clothingProduct.name,
      itemQuantity: clothingProduct.itemQuantity,
      quantity: clothingProduct.quantity,
      price: clothingProduct.price,
    })),
  );

 
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

 
  function handleAdjustQuantity(id: number, delta: number) {
   
    setProductInfo((prevData) =>
      
      prevData.map((info) =>
        info.id === id
          ? { ...info, itemQuantity: Math.max(0, info.itemQuantity + delta) }
          : info,
      ),
    );
  }

  
  function handleChangePrice(id: number, price: number) {
    setProductInfo((prevData) =>
      prevData.map((info) => (info.id === id ? { ...info, price } : info)),
    );
  }

  
  function handleAddToCart(cartItem: CartItem) {
    setCartItems((prevCart) => {
      
      return [...prevCart, { ...cartItem }];
    });
  }

  
  return (
    <div>
      <ClothesContainer
        data={data}
        productInfo={productInfo}
        handleAdjustQuantity={handleAdjustQuantity}
        handleChangePrice={handleChangePrice}
        handleAddToCart={handleAddToCart}
      />
      <CartContainer cartData={cartItems} />
    </div>
  );
}