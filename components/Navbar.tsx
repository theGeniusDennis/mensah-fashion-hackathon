"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/cart-store";
import { API_BASE } from "@/lib/api";

export default function Navbar() {
  const { toggleCart, totalItems } = useCartStore();
  const count = totalItems();

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop py-6 bg-background/80 backdrop-blur-xl border-b border-outline-variant/20">
      {/* Left Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link
          href="/collections"
          className="text-xs font-semibold tracking-[0.1em] uppercase text-on-surface-variant hover:text-primary transition-colors duration-300"
        >
          Collections
        </Link>
        <Link
          href="/stylist"
          className="text-xs font-semibold tracking-[0.1em] uppercase text-on-surface-variant hover:text-primary transition-colors duration-300"
        >
          AI Stylist
        </Link>
      </div>

      {/* Center Logo */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <Link href="/">
          <Image
            src={`${API_BASE}/images/mensah/logo.png`}
            alt="MENSAH"
            width={120}
            height={36}
            className="h-8 w-auto object-contain"
            priority
            unoptimized
          />
        </Link>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6 ml-auto">
        <Link
          href="/collections"
          className="text-xs font-semibold tracking-[0.1em] uppercase text-on-surface-variant hover:text-primary transition-colors duration-300 hidden md:block"
        >
          Our Story
        </Link>

        {/* Cart Button */}
        <button
          onClick={toggleCart}
          className="relative flex items-center gap-1.5 text-on-surface hover:text-tertiary transition-colors duration-300"
          aria-label="Open cart"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-tertiary text-on-tertiary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {count}
            </span>
          )}
        </button>

        {/* Mobile menu */}
        <button className="md:hidden text-on-surface">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
