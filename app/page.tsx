import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/api";
import { enrichProducts, EDITORIAL_CAMPAIGNS } from "@/lib/products";
import { API_BASE } from "@/lib/api";
import HeroSection from "@/components/landing/HeroSection";
import CampaignSection from "@/components/landing/CampaignSection";
import ProductCard from "@/components/ProductCard";

export default async function HomePage() {
  let products: ReturnType<typeof enrichProducts> = [];
  try {
    const raw = await getProducts();
    products = enrichProducts(raw);
  } catch {
    products = [];
  }

  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      <HeroSection heroImageUrl={`${API_BASE}/images/mensah/outfit2.jpeg`} />

      {/* Curated Visions — Campaigns */}
      <CampaignSection products={products} />

      {/* Product Philosophy */}
      <section className="bg-surface-container-low py-section-gap relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-12 items-center gap-16">
          <div className="md:col-span-5">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-tertiary mb-4 block">
              Our Philosophy
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-on-surface mb-8 leading-tight">
              Precision.
              <br />
              <em>Uncompromised.</em>
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-sm">
              Each garment is a dialogue between the tailor&apos;s hand and the
              wearer&apos;s ambition. We source the world&apos;s finest natural
              fibres to create pieces that transcend trends.
            </p>
            <div className="space-y-6">
              {[
                {
                  label: "Crafted for You",
                  desc: "Bespoke measurements guided through our proprietary AI concierge.",
                },
                {
                  label: "Sustainable Luxury",
                  desc: "Ethically sourced fabrics with a lifetime craftsmanship guarantee.",
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-1 h-1 rounded-full bg-tertiary mt-2.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-[11px] font-semibold tracking-[0.1em] uppercase text-on-surface mb-1">
                      {item.label}
                    </h4>
                    <p className="text-on-surface-variant text-sm opacity-70">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <div className="relative">
              <div className="aspect-square overflow-hidden bg-surface-container-highest">
                <Image
                  src={`${API_BASE}/images/mensah/outfit4.jpeg`}
                  alt="Mensah Craftsmanship"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover grayscale brightness-75"
                  unoptimized
                />
              </div>
              <div className="absolute -bottom-6 -left-6 p-8 bg-background border border-outline-variant/20 hidden md:block">
                <p className="font-serif text-xl italic text-on-surface">
                  &ldquo;Modern heritage.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-section-gap px-margin-desktop max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-4">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-tertiary mb-3 block">
                Selected Pieces
              </span>
              <h2 className="font-serif text-4xl text-on-surface">
                The Edit
              </h2>
            </div>
            <Link
              href="/collections"
              className="text-[11px] font-semibold tracking-[0.1em] uppercase text-tertiary border-b border-tertiary/30 pb-1 hover:border-tertiary transition-all"
            >
              View Full Collection
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* AI Stylist CTA */}
      <section className="py-section-gap px-margin-desktop">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-surface-container border border-outline-variant/20 p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-tertiary to-transparent" />
            </div>
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-tertiary mb-4 block">
              Mensah AI Stylist
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-on-surface mb-6 max-w-2xl mx-auto leading-tight">
              Your Personal Concierge. <em>Intelligently Curated.</em>
            </h2>
            <p className="text-on-surface-variant text-lg max-w-lg mx-auto mb-10 opacity-80">
              Describe your occasion, your aesthetic, your ambition — and let
              the Mensah AI stylist assemble the perfect look for you.
            </p>
            <Link
              href="/stylist"
              className="inline-flex items-center gap-3 bg-primary-container border border-tertiary text-tertiary text-[12px] font-semibold tracking-[0.1em] uppercase px-10 py-5 hover:bg-tertiary hover:text-primary-container transition-all duration-500"
            >
              Begin Styling Session
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-margin-desktop py-16 flex flex-col md:flex-row justify-between items-start gap-12 bg-surface-container-lowest border-t border-outline-variant/10">
        <div className="max-w-xs">
          <h3 className="font-serif text-2xl text-on-surface mb-4">MENSAH</h3>
          <p className="text-on-surface-variant text-sm mb-6 opacity-60 leading-relaxed">
            Defining the visual language of the modern African gentleman through
            precision tailoring and digital innovation.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-on-surface mb-1">
              Explore
            </span>
            {["Collections", "AI Stylist", "Our Story"].map((item) => (
              <Link
                key={item}
                href={item === "Collections" ? "/collections" : item === "AI Stylist" ? "/stylist" : "/"}
                className="text-[11px] tracking-wider uppercase text-on-surface-variant hover:text-tertiary transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-on-surface mb-1">
              Client Care
            </span>
            {["Shipping", "Returns", "Contact"].map((item) => (
              <span
                key={item}
                className="text-[11px] tracking-wider uppercase text-on-surface-variant opacity-60"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full md:w-auto mt-8 md:mt-0 pt-8 md:pt-0 border-t md:border-t-0 border-outline-variant/10">
          <p className="text-[10px] tracking-widest text-on-surface-variant opacity-40 uppercase">
            © 2024 Mensah Atelier. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
