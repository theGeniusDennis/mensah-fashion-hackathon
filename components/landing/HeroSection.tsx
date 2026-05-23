"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection({ heroImageUrl }: { heroImageUrl: string }) {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImageUrl}
          alt="Mensah — Luxury Menswear"
          fill
          className="object-cover object-top"
          priority
          unoptimized
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-margin-desktop pt-24">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[11px] font-semibold tracking-[0.3em] uppercase text-tertiary mb-6 block"
          >
            Est. 2024 Atelier
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-serif text-[clamp(3rem,8vw,5rem)] text-on-surface leading-none mb-8"
          >
            Tailored Intelligence
            <br />
            <em>for the Modern</em>
            <br />
            Gentleman.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-on-surface-variant text-lg leading-relaxed mb-12 max-w-xl opacity-90"
          >
            Discover a digital concierge experience designed for the discerning
            gentleman. Precision in every stitch, heritage in every thread.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-3 bg-primary-container border border-tertiary text-tertiary text-[12px] font-semibold tracking-[0.1em] uppercase px-10 py-5 hover:bg-tertiary hover:text-primary-container transition-all duration-500 active:scale-95"
            >
              Explore Collection
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              href="/stylist"
              className="inline-flex items-center justify-center gap-3 border border-outline-variant/40 text-on-surface text-[12px] font-semibold tracking-[0.1em] uppercase px-10 py-5 hover:bg-surface-bright transition-all duration-300 backdrop-blur-md active:scale-95"
            >
              Talk to AI Stylist
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 left-margin-desktop flex items-center gap-4"
      >
        <div className="w-12 h-px bg-on-surface" />
        <span className="text-[10px] font-semibold tracking-widest uppercase text-on-surface">
          Scroll to Explore
        </span>
      </motion.div>
    </section>
  );
}
