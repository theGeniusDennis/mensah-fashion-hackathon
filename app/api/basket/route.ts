import { NextRequest, NextResponse } from "next/server";
import { createBasket, buildWhatsAppUrl, formatPrice } from "@/lib/api";
import type { BasketRequest } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body: BasketRequest = await req.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "No items in basket" }, { status: 400 });
    }
    if (!body.customer_name?.trim()) {
      return NextResponse.json({ error: "Customer name is required" }, { status: 400 });
    }
    if (!body.customer_phone?.trim()) {
      return NextResponse.json({ error: "Customer phone is required" }, { status: 400 });
    }

    const basket = await createBasket(body);

    // Build WhatsApp order message
    const itemLines = body.items
      .map((i) => `• ${i.qty}x ${i.item_id}${i.item_note ? ` (${i.item_note})` : ""}`)
      .join("\n");

    const orderText = [
      `*New Order — Mensah Atelier*`,
      ``,
      `*Customer:* ${body.customer_name}`,
      `*Phone:* ${body.customer_phone}`,
      body.customer_note ? `*Note:* ${body.customer_note}` : null,
      ``,
      `*Order:*`,
      itemLines,
      ``,
      basket.total_minor
        ? `*Total:* ${formatPrice(basket.total_minor, basket.currency)}`
        : "",
      ``,
      `*Basket ID:* ${basket.id}`,
    ]
      .filter((l) => l !== null)
      .join("\n");

    const whatsappUrl = buildWhatsAppUrl(orderText);

    return NextResponse.json({ basket, whatsappUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
