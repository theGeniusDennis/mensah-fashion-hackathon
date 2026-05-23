"use client";

import { useCartStore } from "@/lib/cart-store";
import type { ProductWithMeta } from "@/lib/types";

export default function AddToCartButton({ product }: { product: ProductWithMeta }) {
  const { addItem } = useCartStore();

  if (!product.in_stock) {
    return (
      <button
        disabled
        className="w-full border border-outline-variant/20 text-on-surface-variant text-[11px] font-semibold tracking-[0.1em] uppercase py-4 opacity-40 cursor-not-allowed"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      onClick={() => addItem(product)}
      className="w-full bg-primary-container border border-tertiary text-tertiary text-[11px] font-semibold tracking-[0.1em] uppercase py-5 hover:bg-tertiary hover:text-primary-container transition-all duration-500 active:scale-95"
    >
      Add to Cart
    </button>
  );
}
