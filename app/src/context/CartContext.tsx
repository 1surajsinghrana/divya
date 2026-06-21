import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { CartItem } from "@/data/products";

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  coupon: { code: string; discount: number; type: "percent" | "fixed" } | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discount: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "divya_cart";
const COUPON_STORAGE_KEY = "divya_coupon";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [coupon, setCoupon] = useState<CartContextType["coupon"]>(() => {
    try {
      const stored = localStorage.getItem(COUPON_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(coupon));
    } else {
      localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  }, [coupon]);

  const addItem = useCallback((newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === newItem.productId && i.variantId === newItem.variantId
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === newItem.productId && i.variantId === newItem.variantId
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
  }, []);

  const removeItem = useCallback((productId: string, variantId: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variantId === variantId))
    );
  }, []);

  const updateQuantity = useCallback((productId: string, variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    setCoupon(null);
  }, []);

  const applyCoupon = useCallback((code: string): boolean => {
    const validCoupons: Record<string, { discount: number; type: "percent" | "fixed" }> = {
      DIVYA10: { discount: 10, type: "percent" },
      WELCOME20: { discount: 20, type: "percent" },
      FLAT50: { discount: 50, type: "fixed" },
      FESTIVE15: { discount: 15, type: "percent" },
    };
    const found = validCoupons[code.toUpperCase()];
    if (found) {
      setCoupon({ code: code.toUpperCase(), ...found });
      return true;
    }
    return false;
  }, []);

  const removeCoupon = useCallback(() => {
    setCoupon(null);
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  let discount = 0;
  if (coupon) {
    if (coupon.type === "percent") {
      discount = Math.min((subtotal * coupon.discount) / 100, subtotal);
    } else {
      discount = Math.min(coupon.discount, subtotal);
    }
  }

  const total = subtotal - discount;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        coupon,
        applyCoupon,
        removeCoupon,
        discount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
