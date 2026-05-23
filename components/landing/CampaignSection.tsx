"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EDITORIAL_CAMPAIGNS } from "@/lib/products";
import type { ProductWithMeta } from "@/lib/types";

export default function CampaignSection({ products }: { products: ProductWithMeta[] }) {
  const campaigns = EDITORIAL_CAMPAIGNS.slice(0, 2);

  return (
    <section className="py-section-gap">
      {campaigns.map((campaign, i) => {
        const coverProduct = products.find((p) => campaign.productIds.includes(p.id));
        const isEven = i % 2 === 0;

        return (
          <div key={campaign.id} className="max-w-[1440px] mx-auto px-margin-desktop py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
                className={`relative md:col-span-7 aspect-[4/3] overflow-hidden bg-surface-container-lowest ${!isEven ? "md:order-last" : ""}`}
              >
                {coverProduct && (
                  <Image
                    src={coverProduct.displayImageUrl}
                    alt={campaign.title}
                    fill
                    className="object-cover transition-transform duration-[1200ms] hover:scale-105"
                    unoptimized
                  />
                )}
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="md:col-span-5"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-tertiary mb-6 block">
                  Campaign {String(i + 1).padStart(2, "0")} / {campaign.subtitle}
                </span>
                <h3 className="font-serif text-4xl md:text-5xl text-on-surface leading-[1.05] mb-8">
                  {campaign.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed mb-10 max-w-md opacity-70">
                  {campaign.copy}
                </p>
                <Link
                  href="/collections"
                  className="text-[10px] uppercase tracking-widest text-on-surface border-b border-outline-variant/30 pb-2 hover:border-tertiary hover:text-tertiary transition-all"
                >
                  Read the Editorial
                </Link>
              </motion.div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
