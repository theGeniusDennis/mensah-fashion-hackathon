export interface Product {
  id: string;
  merchant_id: string;
  name: string;
  description: string;
  price_minor: number;
  currency: string;
  image_urls: string[];
  in_stock: boolean;
}

export interface ProductWithMeta extends Product {
  luxuryName: string;
  luxuryDescription: string;
  category: string;
  occasions: string[];
  styleNote: string;
  material: string;
  fit: string;
  featured: boolean;
  displayImageUrl: string;
}

export interface Campaign {
  id: string;
  merchant_id: string;
  title: string;
  copy_text: string;
  image_urls: string[];
  featured_item_ids: string[];
}

export interface BasketItem {
  item_id: string;
  qty: number;
  item_note?: string;
}

export interface BasketRequest {
  merchant_id: string;
  items: BasketItem[];
  customer_name: string;
  customer_phone: string;
  customer_note?: string;
  team_slug: string;
}

export interface Basket {
  id: string;
  merchant_id: string;
  items: BasketItem[];
  customer_name: string;
  customer_phone: string;
  total_minor: number;
  currency: string;
  whatsapp_url?: string;
}

export interface CartItem {
  product: ProductWithMeta;
  quantity: number;
}
