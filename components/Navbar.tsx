"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";

const LETTERS = ["M", "E", "N", "S", "A", "H"];

export default function Navbar() {
  const { toggleCart, totalItems } = useCartStore();
  const count = totalItems();
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  function handleLogoClick(e: React.MouseEvent) {
    e.preventDefault();
    if (clicked) return;
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
      router.push("/");
    }, 580);
  }

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

      {/* Center Logo — animated letters */}
      <div className="absolute left-1/2 -translate-x-1/2">
        <button
          onClick={handleLogoClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Go to homepage"
          className="flex items-center font-serif text-[1.35rem] select-none cursor-pointer"
          style={{ letterSpacing: "0.4em" }}
        >
          {LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              className={`inline-block transition-colors duration-300 ${
                hovered || clicked ? "text-tertiary" : "text-on-surface"
              }`}
              animate={
                clicked
                  ? { y: [0, -18, 4, 0] }
                  : hovered
                  ? { y: -4 }
                  : { y: 0 }
              }
              transition={{
                duration: clicked ? 0.52 : 0.22,
                delay: i * 0.055,
                ease: "easeOut",
              }}
            >
              {letter}
            </motion.span>
          ))}
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6 ml-auto">
        <Link
          href="/collections"
          className="text-xs font-semibold tracking-[0.1em] uppercase text-on-surface-variant hover:text-primary transition-colors duration-300 hidden md:block"
        >
          Our Story
        </Link>

        {/* Cart */}
        <button
          onClick={toggleCart}
          className="relative flex items-center gap-1.5 text-on-surface hover:text-tertiary transition-colors duration-300"
          aria-label="Open cart"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

    </nav>
  );
}
