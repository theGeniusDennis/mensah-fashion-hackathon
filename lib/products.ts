import type { Product, ProductWithMeta } from "./types";
import { imageUrl } from "./api";

interface ProductMeta {
  luxuryName: string;
  luxuryDescription: string;
  category: string;
  occasions: string[];
  styleNote: string;
  material: string;
  fit: string;
  featured: boolean;
}

const PRODUCT_META: Record<string, ProductMeta> = {
  "outfit-1": {
    luxuryName: "The Mensah Blazer",
    luxuryDescription:
      "A masterpiece in contemporary tailoring. Crafted from a premium wool-cashmere blend, this blazer features hand-stitched lapels and a precisely structured silhouette that commands attention in every room.",
    category: "Blazers",
    occasions: ["Business", "Cocktail", "Creative"],
    styleNote:
      "Pair with charcoal trousers and leather loafers for a refined executive look.",
    material: "Wool-Cashmere Blend",
    fit: "Slim Fit",
    featured: true,
  },
  "outfit-2": {
    luxuryName: "Midnight Silk Tuxedo",
    luxuryDescription:
      "Reserved for moments that demand nothing less than perfection. This midnight silk tuxedo is a statement of restrained opulence — precise in every seam, commanding in every room.",
    category: "Tuxedos",
    occasions: ["Gala", "Black Tie", "Evening Events"],
    styleNote:
      "Complete the look with Geometric Gold Cufflinks and Signature Leather Loafers.",
    material: "Pure Silk",
    fit: "Regular Fit",
    featured: true,
  },
  "outfit-3": {
    luxuryName: "The Atelier Suit",
    luxuryDescription:
      "Born from the intersection of modern minimalism and West African craftsmanship. A suit that speaks quietly but carries the weight of intention in every thread.",
    category: "Suits",
    occasions: ["Office", "Business Formal", "Conferences"],
    styleNote:
      "Wear with a crisp ivory shirt and Oxford shoes for understated authority.",
    material: "Italian Wool",
    fit: "Tailored Fit",
    featured: false,
  },
  "outfit-4": {
    luxuryName: "The Executive Double",
    luxuryDescription:
      "Power dressed in restraint. The double-breasted structure commands presence while the muted palette keeps the statement elegant and enduring.",
    category: "Suits",
    occasions: ["Board Meetings", "Formal Events", "Corporate"],
    styleNote:
      "Pair with a slim tie and polished Derby shoes to complete the executive narrative.",
    material: "Super 120s Wool",
    fit: "Classic Fit",
    featured: true,
  },
  "outfit-5": {
    luxuryName: "Modern Heritage Suit",
    luxuryDescription:
      "A dialogue between heritage craftsmanship and contemporary sensibility. Each stitch tells a story of cultural depth and modern ambition.",
    category: "Suits",
    occasions: ["Weddings", "Ceremonies", "Smart Casual"],
    styleNote:
      "Style with loafers and a pocket square for a creative yet polished presence.",
    material: "Wool-Linen Blend",
    fit: "Slim Fit",
    featured: false,
  },
  "outfit-6": {
    luxuryName: "Grand Occasion Ensemble",
    luxuryDescription:
      "Crafted for evenings that deserve to be remembered. This ensemble blends the precision of bespoke tailoring with the ease of confident elegance.",
    category: "Occasionwear",
    occasions: ["Weddings", "Galas", "Engagements"],
    styleNote:
      "Complete with gold accessories and an ivory pocket square for ceremonial elegance.",
    material: "Jacquard Wool",
    fit: "Relaxed Tailored",
    featured: false,
  },
  "outfit-7": {
    luxuryName: "The Boardroom Collection",
    luxuryDescription:
      "Precision personified. Designed for the modern executive who understands that how you dress reflects how you think — sharp, intentional, and always ahead of the room.",
    category: "Suits",
    occasions: ["Board Meetings", "Conferences", "Corporate Events"],
    styleNote:
      "Wear with a structured briefcase and polished Oxford shoes to complete the authority.",
    material: "Fine Merino Wool",
    fit: "Slim Fit",
    featured: false,
  },
  "outfit-8": {
    luxuryName: "The Creative Founder",
    luxuryDescription:
      "For those who lead without conforming. A carefully deconstructed blazer balancing structured authority with contemporary ease — built for creative spaces and cultural conversations.",
    category: "Blazers",
    occasions: ["Creative Events", "Smart Casual", "Networking"],
    styleNote:
      "Pair with dark trousers and clean leather sneakers for an elevated casual look.",
    material: "Technical Wool",
    fit: "Relaxed Fit",
    featured: false,
  },
  "outfit-9": {
    luxuryName: "Ivory Ceremonial Set",
    luxuryDescription:
      "A tribute to occasion. The ivory ceremonial set embodies the quiet confidence of a man who arrives knowing what he represents — heritage, presence, and grace.",
    category: "Occasionwear",
    occasions: ["Engagements", "Traditional Ceremonies", "Weddings"],
    styleNote:
      "Accessorize with gold cufflinks and a matching ivory pocket square for cohesion.",
    material: "Ivory Silk-Wool Blend",
    fit: "Classic Ceremonial",
    featured: true,
  },
  "outfit-10": {
    luxuryName: "Signature Accessories",
    luxuryDescription:
      "The finishing details that define the look. A curated collection of handcrafted accessories that complete any Mensah ensemble with precision.",
    category: "Accessories",
    occasions: ["All Occasions"],
    styleNote:
      "The right accessories elevate any look from distinguished to unforgettable.",
    material: "Mixed Premium Materials",
    fit: "One Size",
    featured: false,
  },
};

export function enrichProduct(product: Product): ProductWithMeta {
  const meta = PRODUCT_META[product.id] ?? {
    luxuryName: product.name,
    luxuryDescription: product.description || "A premium Mensah piece.",
    category: "Collection",
    occasions: ["All Occasions"],
    styleNote: "Style as desired.",
    material: "Premium Fabric",
    fit: "Standard Fit",
    featured: false,
  };

  return {
    ...product,
    ...meta,
    displayImageUrl: imageUrl(product.image_urls?.[0] ?? ""),
  };
}

export function enrichProducts(products: Product[]): ProductWithMeta[] {
  return products.map(enrichProduct);
}

export const EDITORIAL_CAMPAIGNS = [
  {
    id: "executive-edit",
    title: "The Executive Edit",
    subtitle: "Chapter I",
    copy: "Power without announcement. A curation for the modern gentleman who commands the room through restraint.",
    productIds: ["outfit-1", "outfit-4", "outfit-7"],
  },
  {
    id: "evening-collection",
    title: "Evening Collection",
    subtitle: "Chapter II",
    copy: "For evenings that deserve to be remembered. Precision tailoring meeting the quiet drama of night.",
    productIds: ["outfit-2", "outfit-6", "outfit-9"],
  },
  {
    id: "modern-heritage",
    title: "Modern Heritage",
    subtitle: "Chapter III",
    copy: "Where African craftsmanship meets contemporary vision. A collection rooted in identity and elevated by design.",
    productIds: ["outfit-3", "outfit-5", "outfit-8"],
  },
];
