"use client";

import { useState, useEffect } from "react";
import { getProducts } from "@/lib/api";
import { enrichProducts } from "@/lib/products";
import type { ProductWithMeta } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

const CATEGORIES = ["All", "Suits", "Blazers", "Tuxedos", "Occasionwear", "Accessories"];

export default function CollectionsPage() {
  const [products, setProducts] = useState<ProductWithMeta[]>([]);
  const [filtered, setFiltered] = useState<ProductWithMeta[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((raw) => {
        const enriched = enrichProducts(raw);
        setProducts(enriched);
        setFiltered(enriched);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === activeCategory));
    }
  }, [activeCategory, products]);

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <div className="px-margin-desktop pt-16 pb-12 max-w-[1440px] mx-auto border-b border-outline-variant/20">
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-tertiary mb-3 block">
          Mensah — Chapter I
        </span>
        <h1 className="font-serif text-5xl md:text-6xl text-on-surface">
          The Modern Heritage
        </h1>
      </div>

      <div className="max-w-[1440px] mx-auto px-margin-desktop flex gap-12 pt-12 pb-section-gap">
        {/* Sidebar Filters */}
        <aside className="hidden md:block w-48 flex-shrink-0">
          <div className="sticky top-32">
            <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-on-surface-variant mb-4 opacity-60">
              Categories
            </p>
            <nav className="flex flex-col gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-left text-[12px] font-semibold tracking-[0.05em] uppercase py-2 transition-colors duration-200 border-l-2 pl-3 ${
                    activeCategory === cat
                      ? "border-tertiary text-tertiary"
                      : "border-transparent text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>

            <div className="mt-10 pt-8 border-t border-outline-variant/20">
              <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-on-surface-variant mb-4 opacity-60">
                Price Range
              </p>
              <p className="text-xs text-on-surface-variant opacity-60">
                GHS 350 — GHS 2,000
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Category Scroll */}
        <div className="flex md:hidden gap-3 overflow-x-auto pb-4 -mx-margin-mobile px-margin-mobile mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 text-[11px] font-semibold tracking-[0.08em] uppercase px-4 py-2 border transition-colors ${
                activeCategory === cat
                  ? "border-tertiary text-tertiary bg-primary-container"
                  : "border-outline-variant/40 text-on-surface-variant"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <p className="text-xs tracking-widest uppercase text-on-surface-variant opacity-60">
              {filtered.length} pieces
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-surface-container-high animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center h-64 border border-outline-variant/20">
              <p className="text-on-surface-variant text-sm tracking-widest uppercase opacity-40">
                No pieces in this category
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
