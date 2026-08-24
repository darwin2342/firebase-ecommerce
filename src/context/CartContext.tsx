import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "../types/Product";
import type { CartItem } from "../types/Cart";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (
    productId: string
  ) => void;
  clearCart: () => void;
}

const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );

export const CartProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cart, setCart] =
    useState<CartItem[]>([]);

  const addToCart = (
    product: Product
  ) => {
    setCart((currentCart) => {
      const existing =
        currentCart.find(
          (item) =>
            item.productId === product.id
        );

      if (existing) {
        return currentCart.map((item) =>
          item.productId === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (
    productId: string
  ) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          item.productId !== productId
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
};