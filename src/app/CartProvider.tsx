'use client';

import { createContext, useContext } from 'react';
import { useCart } from '@/hooks/useCart';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(CartContext);
};