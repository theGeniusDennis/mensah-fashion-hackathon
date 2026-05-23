import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getProducts } from "@/lib/api";
import { enrichProducts } from "@/lib/products";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    const products = await getProducts();
    const enriched = enrichProducts(products);

    const catalog = enriched
      .map(
        (p) =>
          `- ID: ${p.id} | Name: ${p.luxuryName} | Category: ${p.category} | Price: GHS ${p.price_minor / 100} | Occasions: ${p.occasions.join(", ")} | Fit: ${p.fit} | Material: ${p.material}`
      )
      .join("\n");

    const systemPrompt = `You are the Mensah AI Stylist — a sophisticated personal stylist for a luxury African menswear brand. Your role is to help discerning gentlemen discover the perfect outfit for any occasion.

CURRENT INVENTORY:
${catalog}

GUIDELINES:
- Respond with quiet sophistication and editorial elegance. Never use filler phrases like "Great choice!" or "Certainly!"
- Always recommend 1-3 specific products from the catalog by their exact ID and name
- Tailor recommendations to the gentleman's occasion, aesthetic, and context
- Include a brief styling note about how to wear the pieces together
- Reference Ghanaian/African occasions naturally (board meetings in Accra, engagements, traditional ceremonies, etc.)
- Keep responses concise and refined — 3-4 sentences maximum
- End with a subtle question that deepens the styling conversation

RESPONSE FORMAT:
Return valid JSON with this structure:
{
  "message": "Your styled response text here",
  "recommendations": [
    { "id": "outfit-x", "name": "Product Name", "reason": "Why this piece" }
  ]
}`;

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...(history || []),
      { role: "user", content: message },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content ?? "{}";
    const parsed = JSON.parse(content);

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Stylist API error:", err);
    return NextResponse.json(
      {
        message:
          "I apologize — allow me a moment to recalibrate. Please try your request again.",
        recommendations: [],
      },
      { status: 200 }
    );
  }
}
