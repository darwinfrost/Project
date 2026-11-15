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
  productId: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
  image: string;
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

  

  function handleAddToCart(newItem: CartItem) {
  setCartItems((prevCart) => {
    const existingItem = prevCart.find((item) => item.productId === newItem.productId);
    if (existingItem) {
      return prevCart.map((item) =>item.productId === newItem.productId? {
        ...item,
        quantity: item.quantity + newItem.quantity,
        total: item.total + newItem.total,
        }: item);}
  return [...prevCart, newItem];});
  setProductInfo((prevData) =>
    prevData.map((info) =>info.id === newItem.productId? {
    ...info,
    quantity: info.quantity - newItem.quantity,
    itemQuantity: 0,}: info));
}

  // function handleAddToCart(cartItem: CartItem) {
  //   setCartItems((prevCart) => {
      
  //     return [...prevCart, { ...cartItem }];
  //   });
  // }

  // function handleAddToCart(cartItem: CartItem) {
  //   (cartItems.some((item) => item.id === cartItem.id))? 
  //   cartItems.find((item) => item.id === cartItem.id)!.quantity += cartItem.quantity
  //   :
    
  //   setCartItems((prevCart) => {
      
  //     return [...prevCart, { ...cartItem }];
  //   });
  // }


  //   function handleAddToCart(newCartItem: CartItem) {
  //   cartItems.forEach((cartItem) => {
  //   { if (cartItem.id == cartItem.id)
  //   {
  //     cartItem.quantity += cartItem.quantity;
  //   }
  //   else 
  //   {
  //         setCartItems((prevCart) => {
      
  //     return [...prevCart, { ...newCartItem }];
  //   });
  //   }
  //   }
  //   });
  // }
  
  return (
    <div>
      <ClothesContainer
        data={data}
        productInfo={productInfo}
        handleAdjustQuantity={handleAdjustQuantity}
        handleAddToCart={handleAddToCart}
      />
      <CartContainer cartData={cartItems} />
    </div>
  );
}