"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  heroImageUrl: string;
  secondaryImageUrl: string;
}

export default function HeroSection({ heroImageUrl, secondaryImageUrl }: Props) {
  return (
    <section className="relative h-screen flex overflow-hidden bg-background">

      {/* ── LEFT PANEL — editorial text ── */}
      <div className="relative w-full md:w-[58%] flex flex-col justify-between px-margin-desktop pt-28 pb-10 z-10">

        {/* Ghost chapter number */}
        <div
          className="absolute right-0 top-1/2 -translate-y-[60%] font-serif leading-none text-surface-container select-none pointer-events-none"
          style={{ fontSize: "clamp(8rem,18vw,18rem)" }}
          aria-hidden
        >
          01
        </div>

        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="flex items-center justify-between"
        >
          <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-tertiary">
            Est. 2024 — Accra
          </span>
          <div className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/40">
            <span className="w-5 h-px bg-outline-variant/40 inline-block" />
            Mensah Atelier
          </div>
        </motion.div>

        {/* Headline block */}
        <div className="relative z-10">
          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-10 h-px bg-tertiary mb-8 origin-left"
          />

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-serif text-on-surface leading-[0.95] tracking-tight mb-8"
            style={{ fontSize: "clamp(3.2rem,6.5vw,6rem)" }}
          >
            The Art of
            <br />
            <em className="text-on-surface/75">Modern</em>
            <br />
            Tailoring.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-10 max-w-sm opacity-70"
          >
            A digital menswear concierge for the discerning gentleman.
            Precision in every stitch, heritage in every thread.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.78 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-3 bg-primary-container border border-tertiary text-tertiary text-[11px] font-semibold tracking-[0.12em] uppercase px-9 py-4 hover:bg-tertiary hover:text-primary-container transition-all duration-500"
            >
              Explore Collection
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              href="/stylist"
              className="inline-flex items-center justify-center gap-3 border border-outline-variant/30 text-on-surface text-[11px] font-semibold tracking-[0.12em] uppercase px-9 py-4 hover:bg-surface-container transition-all duration-300"
            >
              AI Stylist
            </Link>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center gap-5"
        >
          <div className="w-8 h-px bg-outline-variant/50" />
          <span className="text-[10px] font-semibold tracking-[0.28em] uppercase text-on-surface-variant/40">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="w-1 h-1 rounded-full bg-tertiary/60"
          />
        </motion.div>
      </div>

      {/* ── RIGHT PANEL — images ── */}
      <div className="hidden md:block relative flex-1 bg-surface-container-lowest overflow-hidden">

        {/* Primary image */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.1 }}
          className="absolute inset-0"
        >
          <Image
            src={heroImageUrl}
            alt="Mensah collection"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          {/* Left-edge blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent" />
        </motion.div>

        {/* Floating secondary image */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 40 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-20 left-[-48px] w-40 h-52 z-20 border-4 border-background shadow-2xl"
        >
          <Image
            src={secondaryImageUrl}
            alt="Mensah look"
            fill
            className="object-cover"
            unoptimized
          />
        </motion.div>

        {/* Vertical editorial label */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10">
          <div className="w-px h-16 bg-on-surface/10" />
          <span
            className="text-[9px] font-semibold tracking-[0.25em] uppercase text-on-surface/20 whitespace-nowrap"
            style={{ writingMode: "vertical-rl" }}
          >
            Collection 2024
          </span>
          <div className="w-px h-16 bg-on-surface/10" />
        </div>

        {/* Chapter label bottom-right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute bottom-10 right-8 flex items-center gap-3 z-10"
        >
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-tertiary/70">
            The Heritage Edit
          </span>
          <div className="w-6 h-px bg-tertiary/40" />
          <span className="font-serif text-4xl text-on-surface/10 leading-none">01</span>
        </motion.div>
      </div>

      {/* Mobile: full-bleed background */}
      <div className="absolute inset-0 md:hidden z-0">
        <Image
          src={heroImageUrl}
          alt="Mensah"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/20" />
      </div>

    </section>
  );
}
