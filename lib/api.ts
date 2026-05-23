import type { Product, Campaign, BasketRequest, Basket } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_BASE!;
const MERCHANT_ID = process.env.NEXT_PUBLIC_MERCHANT_ID!;
const TEAM_SLUG = process.env.NEXT_PUBLIC_TEAM_SLUG!;

export const API_BASE = BASE;
export const MERCHANT = MERCHANT_ID;
export const TEAM = TEAM_SLUG;

export function imageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${BASE}${path}`;
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/merchants/${MERCHANT_ID}/items`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE}/items/${id}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
  return res.json();
}

export async function getCampaigns(): Promise<Campaign[]> {
  const res = await fetch(
    `${BASE}/merchants/${MERCHANT_ID}/campaigns?team_slug=${TEAM_SLUG}`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function createBasket(payload: BasketRequest): Promise<Basket> {
  const res = await fetch(`${BASE}/baskets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, team_slug: TEAM_SLUG }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to create basket");
  }
  return res.json();
}

export async function getBasket(id: string): Promise<Basket> {
  const res = await fetch(`${BASE}/baskets/${id}`);
  if (!res.ok) throw new Error("Failed to fetch basket");
  return res.json();
}

export async function registerTeam(): Promise<void> {
  await fetch(`${BASE}/teams`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slug: TEAM_SLUG,
      name: "Mensah",
      merchant_id: MERCHANT_ID,
      contact: "danim005@st.ug.edu.gh",
    }),
  });
}

export async function createCampaign(payload: {
  title: string;
  copy_text: string;
  image_urls: string[];
  featured_item_ids: string[];
}): Promise<Campaign> {
  const res = await fetch(`${BASE}/campaigns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      merchant_id: MERCHANT_ID,
      team_slug: TEAM_SLUG,
    }),
  });
  if (!res.ok) throw new Error("Failed to create campaign");
  return res.json();
}

export function formatPrice(minor: number, currency = "GHS"): string {
  const amount = minor / 100;
  return `${currency} ${amount.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function buildWhatsAppUrl(
  orderSummary: string,
  phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
): string {
  const text = encodeURIComponent(orderSummary);
  return `https://wa.me/${phone}?text=${text}`;
}
