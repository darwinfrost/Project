import type { ClothingProduct } from '../data/data.ts';
import CartContainer from './cartContainer.tsx';
import ClothesContainer from './clothesContainer.tsx';
import { useState } from "react";

interface clothesData {
  
  data: ClothingProduct[];
}

export interface ProductInfo {
 
  id: number;
  
  quantity: number;
  
  price: number;
  name: string,
}


export interface CartItem {
 
  id: string;
  name: string;
  quantity: number;
  price: number;
 
  total: number;
}

export default function ThriftApp({ data }: clothesData) {
 
  const [productInfo, setProductInfo] = useState<ProductInfo[]>(() =>
    data.map((clothingProduct) => ({
      id: clothingProduct.id,
      name: clothingProduct.name,
      quantity: clothingProduct.quantity,
      price: clothingProduct.price,
    })),
  );

 
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

 
  function handleAdjustQuantity(id: number, delta: number) {
   
    setProductInfo((prevData) =>
      
      prevData.map((info) =>
        info.id === id
          ? { ...info, quantity: Math.max(0, info.quantity + delta) }
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