"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/api";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalMinor } =
    useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-surface-container-low z-50 flex flex-col border-l border-outline-variant/20"
          >
            {/* Header */}
            <div className="flex justify-between items-start p-8 border-b border-outline-variant/20">
              <div>
                <h2 className="font-serif text-2xl text-on-surface">Your Selection</h2>
                <p className="text-xs tracking-widest uppercase text-on-surface-variant mt-1 opacity-60">
                  {items.length} {items.length === 1 ? "piece" : "pieces"}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-6 px-8 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 opacity-40">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p className="text-sm tracking-widest uppercase">Your selection is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-20 h-24 bg-surface-container-highest flex-shrink-0 overflow-hidden">
                      <Image
                        src={item.product.displayImageUrl}
                        alt={item.product.luxuryName}
                        width={80}
                        height={96}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm text-on-surface leading-tight">
                        {item.product.luxuryName}
                      </p>
                      <p className="text-[10px] tracking-widest uppercase text-on-surface-variant opacity-60 mt-0.5">
                        {item.product.category}
                      </p>
                      <p className="text-tertiary text-sm mt-2">
                        {formatPrice(item.product.price_minor)}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-6 h-6 border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:border-tertiary hover:text-tertiary transition-colors"
                        >
                          <span className="text-xs">−</span>
                        </button>
                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-6 h-6 border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:border-tertiary hover:text-tertiary transition-colors"
                        >
                          <span className="text-xs">+</span>
                        </button>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="ml-auto text-on-surface-variant hover:text-error transition-colors"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <polyline points="3,6 5,6 21,6" />
                            <path d="M19 6l-1 14H6L5 6" />
                            <path d="M10 11v6M14 11v6" />
                            <path d="M9 6V4h6v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-outline-variant/20 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs tracking-widest uppercase text-on-surface-variant">
                    Subtotal
                  </span>
                  <span className="font-serif text-lg text-on-surface">
                    {formatPrice(totalMinor())}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full bg-primary-container border border-tertiary text-tertiary text-xs font-semibold tracking-[0.1em] uppercase py-4 text-center hover:bg-tertiary hover:text-primary-container transition-all duration-500"
                >
                  Continue to Checkout
                </Link>
                <p className="text-[10px] tracking-wider uppercase text-on-surface-variant opacity-40 text-center">
                  Complete your order via WhatsApp
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
