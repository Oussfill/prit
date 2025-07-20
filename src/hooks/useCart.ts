import { useState } from 'react';
import { Product } from '@/lib/types';

export interface CartItem extends Product {
  quantity: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.sId === product.sId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.sId === product.sId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.sId !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.sId === productId ? { ...item, quantity } : item
      )
    );
  };

  return { cart, addToCart, removeFromCart, updateQuantity };
};