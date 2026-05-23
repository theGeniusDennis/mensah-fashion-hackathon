import Link from "next/link";
import { getProducts } from "@/lib/api";
import { enrichProducts } from "@/lib/products";
import { API_BASE } from "@/lib/api";
import HeroSection from "@/components/landing/HeroSection";
import CampaignSection from "@/components/landing/CampaignSection";
import DigitalValetSection from "@/components/landing/DigitalValetSection";
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
      <HeroSection
        heroImageUrl={`${API_BASE}/images/mensah/outfit1.jpeg`}
        secondaryImageUrl={`${API_BASE}/images/mensah/outfit9.jpeg`}
      />

      {/* Editorial Campaigns */}
      <CampaignSection products={products} />

      {/* Digital Valet */}
      <DigitalValetSection />

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-section-gap px-margin-desktop max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-tertiary mb-3 block">
                Selected Pieces
              </span>
              <h2 className="font-serif text-5xl md:text-6xl text-on-surface">
                The Edit
              </h2>
              <p className="text-on-surface-variant text-[10px] uppercase tracking-widest mt-2 opacity-50">
                Curated Inventory for the Season
              </p>
            </div>
            <Link
              href="/collections"
              className="text-[10px] uppercase tracking-widest text-on-surface border-b border-outline-variant/30 pb-1 hover:border-tertiary hover:text-tertiary transition-all self-start"
            >
              View All Pieces
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {featured.map((product, i) => (
              <div key={product.id} className={i % 2 === 1 ? "lg:translate-y-16" : ""}>
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* WhatsApp Concierge CTA */}
      <section className="py-section-gap px-margin-desktop">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-surface-container p-12 md:p-24 flex flex-col items-center text-center border border-outline-variant/10">
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-tertiary mb-6 block">
              Concierge Checkout
            </span>
            <h2 className="font-serif text-4xl md:text-6xl text-on-surface mb-8 leading-[1.05] max-w-3xl">
              Complete your order with a Mensah stylist.
            </h2>
            <p className="text-on-surface-variant text-lg max-w-xl mx-auto mb-12 opacity-70 leading-relaxed">
              Once your look is assembled, connect with a Mensah Concierge via
              WhatsApp to finalise sizing, discuss tailoring requirements, and
              confirm your private delivery.
            </p>
            <Link
              href="/checkout"
              className="flex items-center gap-6 px-12 py-6 bg-on-surface text-background text-[10px] font-semibold tracking-[0.3em] uppercase hover:bg-tertiary hover:text-background transition-all duration-500"
            >
              Continue to WhatsApp Concierge
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-margin-desktop py-16 flex flex-col md:flex-row justify-between items-start gap-12 bg-surface-container-lowest border-t border-outline-variant/10">
        <div className="max-w-xs">
          <span className="font-serif text-2xl tracking-[0.35em] text-on-surface font-normal block mb-4">MENSAH</span>
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
            {["Sustainability", "Atelier Services", "Privacy"].map((item) => (
              <span
                key={item}
                className="text-[11px] tracking-wider uppercase text-on-surface-variant opacity-60"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full md:w-auto">
          <p className="text-[10px] tracking-widest text-on-surface-variant opacity-40 uppercase">
            © 2024 Mensah Atelier. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
