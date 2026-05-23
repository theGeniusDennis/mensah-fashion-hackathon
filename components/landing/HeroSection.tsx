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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-28 pb-32 md:pt-0 md:pb-0">

      <div className="w-full max-w-[1440px] mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-0 items-center relative z-10">

        {/* LEFT: Text — 5 columns */}
        <div className="md:col-span-5 flex flex-col">

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif italic text-tertiary text-xl mb-6 block"
          >
            Volume I / 2024
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="font-serif text-on-surface leading-[0.9] tracking-tight mb-8"
            style={{ fontSize: "clamp(3.8rem, 7vw, 8.5rem)" }}
          >
            Tailored
            <br />
            <em className="text-on-surface/75">Intelligence</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-10 max-w-sm opacity-70"
          >
            An intersection of heritage craftsmanship and artificial precision.
            Your personal wardrobe, curated by the Mensah Digital Valet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap gap-5"
          >
            <Link
              href="/collections"
              className="px-10 py-4 bg-on-surface text-background text-[10px] font-semibold tracking-widest uppercase hover:bg-tertiary hover:text-background transition-all duration-500"
            >
              Explore Collection
            </Link>
            <Link
              href="/stylist"
              className="px-10 py-4 border border-outline-variant/30 text-on-surface text-[10px] font-semibold tracking-widest uppercase hover:border-tertiary hover:text-tertiary transition-all duration-300"
            >
              Start Styling
            </Link>
          </motion.div>
        </div>

        {/* RIGHT: Images — 7 columns */}
        <div className="md:col-span-7 relative">

          {/* Primary image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.1 }}
            className="relative w-full aspect-[4/5] overflow-hidden md:translate-x-12 shadow-2xl outline outline-1 -outline-offset-1 outline-white/5"
          >
            <Image
              src={heroImageUrl}
              alt="Mensah Volume I — gentleman in a charcoal wool overcoat"
              fill
              className="object-cover object-top"
              priority
              unoptimized
            />
          </motion.div>

          {/* Secondary image — mounted frame */}
          <motion.div
            initial={{ opacity: 0, x: -20, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute -bottom-12 -left-6 md:-left-12 w-40 h-52 md:w-56 md:h-72 bg-background p-3 md:p-4 shadow-2xl border border-outline-variant/20 z-20"
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={secondaryImageUrl}
                alt="Mensah detail"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.div>

          {/* Vertical editorial label */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-10 hidden lg:flex">
            <div className="w-px h-16 bg-on-surface/10" />
            <span
              className="text-[9px] font-semibold tracking-[0.25em] uppercase text-on-surface/20 whitespace-nowrap"
              style={{ writingMode: "vertical-rl" }}
            >
              Collection 2024
            </span>
            <div className="w-px h-16 bg-on-surface/10" />
          </div>
        </div>
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
