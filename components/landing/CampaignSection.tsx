"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EDITORIAL_CAMPAIGNS } from "@/lib/products";
import type { ProductWithMeta } from "@/lib/types";

export default function CampaignSection({ products }: { products: ProductWithMeta[] }) {
  const campaigns = EDITORIAL_CAMPAIGNS.slice(0, 2);

  return (
    <section className="py-section-gap px-margin-desktop max-w-[1440px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-tertiary mb-3 block">
            Current Season
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-on-surface mb-3">
            Curated Visions
          </h2>
          <p className="text-on-surface-variant text-base max-w-md opacity-70">
            Our seasonal explorations of form, function, and cultural identity.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Link
            href="/collections"
            className="text-[11px] font-semibold tracking-[0.1em] uppercase text-tertiary border-b border-tertiary/30 pb-1 hover:border-tertiary transition-all"
          >
            View All Collections
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        {campaigns.map((campaign, i) => {
          const coverProduct = products.find((p) =>
            campaign.productIds.includes(p.id)
          );

          return (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`group relative aspect-[4/5] overflow-hidden ${i === 1 ? "md:mt-24" : ""}`}
            >
              {/* Image */}
              <div className="absolute inset-0 bg-surface-container-lowest">
                {coverProduct && (
                  <Image
                    src={coverProduct.displayImageUrl}
                    alt={campaign.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    unoptimized
                  />
                )}
              </div>

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-12 left-12 right-12">
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-tertiary mb-2 block">
                  {campaign.subtitle}
                </span>
                <h3 className="font-serif text-3xl text-on-surface mb-4">
                  {campaign.title}
                </h3>
                <p className="text-on-surface-variant text-sm opacity-0 group-hover:opacity-80 transition-opacity duration-500 mb-6 max-w-xs leading-relaxed">
                  {campaign.copy}
                </p>
                <Link href="/collections">
                  <button className="w-12 h-12 border border-on-surface/30 flex items-center justify-center group-hover:bg-tertiary group-hover:border-tertiary group-hover:text-primary-container transition-all duration-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </button>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
