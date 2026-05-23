"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, ProductWithMeta } from "./types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: ProductWithMeta) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  totalMinor: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product) => {
        const existing = get().items.find(
          (i) => i.product.id === product.id
        );
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }));
        } else {
          set((s) => ({ items: [...s.items, { product, quantity: 1 }] }));
        }
        set({ isOpen: true });
      },

      removeItem: (productId) =>
        set((s) => ({
          items: s.items.filter((i) => i.product.id !== productId),
        })),

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((s) => ({
          items: s.items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalMinor: () =>
        get().items.reduce(
          (sum, i) => sum + i.product.price_minor * i.quantity,
          0
        ),
    }),
    { name: "mensah-cart" }
  )
);
