"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { ProductWithMeta } from "@/lib/types";
import { formatPrice } from "@/lib/api";
import { useCartStore } from "@/lib/cart-store";

interface Props {
  product: ProductWithMeta;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addItem } = useCartStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      className="group"
    >
      {/* Image Container */}
      <Link href={`/products/${product.id}`}>
        <div className="relative bg-surface-container-highest overflow-hidden aspect-[3/4]">
          <Image
            src={product.displayImageUrl}
            alt={product.luxuryName}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

          {/* Featured badge */}
          {product.featured && (
            <div className="absolute top-4 left-4">
              <span className="bg-tertiary text-on-tertiary text-[10px] font-semibold tracking-[0.1em] uppercase px-2 py-1">
                Featured
              </span>
            </div>
          )}

          {/* Quick add button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              className="w-full bg-primary-container border border-tertiary text-tertiary text-[11px] font-semibold tracking-[0.1em] uppercase py-3 hover:bg-tertiary hover:text-primary-container transition-all duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="pt-4 pb-2">
        <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-on-surface-variant opacity-60 mb-1.5">
          {product.category}
        </p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-serif text-lg text-on-surface leading-tight hover:text-tertiary transition-colors duration-300">
            {product.luxuryName}
          </h3>
        </Link>
        <p className="text-tertiary text-sm mt-2">
          {formatPrice(product.price_minor)}
        </p>
      </div>
    </motion.div>
  );
}
