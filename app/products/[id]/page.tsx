import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts, formatPrice, API_BASE } from "@/lib/api";
import { enrichProduct, enrichProducts } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map((p) => ({ id: p.id }));
  } catch {
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;
  try {
    const raw = await getProduct(id);
    product = enrichProduct(raw);
  } catch {
    notFound();
  }

  let related: ReturnType<typeof enrichProducts> = [];
  try {
    const allRaw = await getProducts();
    related = enrichProducts(allRaw)
      .filter((p) => p.id !== id && p.category === product.category)
      .slice(0, 3);
    if (related.length < 2) {
      related = enrichProducts(allRaw)
        .filter((p) => p.id !== id)
        .slice(0, 3);
    }
  } catch {
    related = [];
  }

  return (
    <div className="min-h-screen pt-24">
      {/* Breadcrumb */}
      <div className="px-margin-desktop pt-8 pb-0 max-w-[1440px] mx-auto">
        <nav className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-on-surface-variant opacity-50">
          <Link href="/" className="hover:opacity-100 transition-opacity">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:opacity-100 transition-opacity">Collections</Link>
          <span>/</span>
          <span className="text-tertiary opacity-100">{product.luxuryName}</span>
        </nav>
      </div>

      {/* Main Product */}
      <section className="max-w-[1440px] mx-auto px-margin-desktop py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-[4/5] bg-surface-container-highest overflow-hidden">
            <Image
              src={product.displayImageUrl}
              alt={product.luxuryName}
              width={800}
              height={1000}
              className="w-full h-full object-cover"
              priority
              unoptimized
            />
          </div>
          {/* Texture detail images (using same image with filters) */}
          <div className="grid grid-cols-3 gap-4">
            {[
              "grayscale brightness-50 contrast-125",
              "sepia brightness-75",
              "grayscale contrast-150 brightness-75",
            ].map((filter, i) => (
              <div key={i} className="aspect-square bg-surface-container-highest overflow-hidden">
                <Image
                  src={product.displayImageUrl}
                  alt={`Detail ${i + 1}`}
                  width={200}
                  height={200}
                  className={`w-full h-full object-cover ${filter}`}
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:pt-4 flex flex-col">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-tertiary mb-2">
            {product.category}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-on-surface mb-4 leading-tight">
            {product.luxuryName}
          </h1>
          <p className="font-serif text-2xl text-tertiary mb-8">
            {formatPrice(product.price_minor)}
          </p>

          <p className="text-on-surface-variant text-base leading-relaxed mb-8 opacity-80">
            {product.luxuryDescription}
          </p>

          {/* Occasions */}
          <div className="flex flex-wrap gap-2 mb-8">
            {product.occasions.map((occ) => (
              <span
                key={occ}
                className="text-[10px] font-semibold tracking-[0.08em] uppercase px-3 py-1.5 border border-outline-variant/40 text-on-surface-variant"
              >
                {occ}
              </span>
            ))}
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-surface-container border border-outline-variant/20">
            {[
              { label: "Material", value: product.material },
              { label: "Fit", value: product.fit },
              { label: "Origin", value: "Mensah Atelier" },
              { label: "Availability", value: product.in_stock ? "In Stock" : "Out of Stock" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-on-surface-variant opacity-50 mb-1">
                  {label}
                </p>
                <p className="text-sm text-on-surface">{value}</p>
              </div>
            ))}
          </div>

          {/* Add to Cart */}
          <div className="space-y-3 mb-8">
            <AddToCartButton product={product} />
            <Link
              href="/stylist"
              className="flex items-center justify-center gap-2 border border-outline-variant/40 text-on-surface-variant text-[11px] font-semibold tracking-[0.1em] uppercase py-4 hover:border-tertiary hover:text-tertiary transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
              </svg>
              Style with AI Stylist
            </Link>
          </div>

          {/* Styling Note */}
          <div className="border-t border-outline-variant/20 pt-6">
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-tertiary mb-2">
              Stylist Note
            </p>
            <p className="text-on-surface-variant text-sm leading-relaxed opacity-80">
              {product.styleNote}
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship Accordion */}
      <section className="max-w-[1440px] mx-auto px-margin-desktop pb-16">
        <div className="border-t border-outline-variant/20">
          {[
            {
              title: "Craftsmanship & Materials",
              content: `Each ${product.luxuryName} is crafted from ${product.material}, selected from the finest mills. Our master tailors spend over 40 hours on each piece, hand-finishing every seam and pressing every lapel to absolute precision.`,
            },
            {
              title: "Sizing & Fit",
              content: `This piece is available in ${product.fit}. For bespoke measurements or fit consultations, speak with our AI Stylist who will guide you through the ideal configuration for your body and occasion.`,
            },
            {
              title: "Care Instructions",
              content: "Dry clean only. Store in the provided garment bag. Press with a cool iron through a damp cloth. Do not bleach or tumble dry.",
            },
          ].map(({ title, content }) => (
            <details key={title} className="border-b border-outline-variant/20 group">
              <summary className="flex justify-between items-center py-5 cursor-pointer list-none text-[11px] font-semibold tracking-[0.1em] uppercase text-on-surface hover:text-tertiary transition-colors">
                {title}
                <svg
                  className="group-open:rotate-45 transition-transform duration-300"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </summary>
              <p className="pb-6 text-on-surface-variant text-sm leading-relaxed opacity-70">
                {content}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="max-w-[1440px] mx-auto px-margin-desktop pb-section-gap border-t border-outline-variant/20 pt-16">
          <h2 className="font-serif text-3xl text-on-surface mb-10">
            Complete the Look
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
            {related.map((p) => (
              <div key={p.id} className="group">
                <Link href={`/products/${p.id}`}>
                  <div className="aspect-[3/4] bg-surface-container-highest overflow-hidden mb-4">
                    <Image
                      src={p.displayImageUrl}
                      alt={p.luxuryName}
                      width={400}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <p className="text-[10px] tracking-widest uppercase text-on-surface-variant opacity-50 mb-1">{p.category}</p>
                  <h3 className="font-serif text-lg text-on-surface group-hover:text-tertiary transition-colors">{p.luxuryName}</h3>
                  <p className="text-tertiary text-sm mt-1">{formatPrice(p.price_minor)}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
