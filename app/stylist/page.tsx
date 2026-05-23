"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";
import { getProducts, formatPrice } from "@/lib/api";
import { enrichProducts } from "@/lib/products";
import type { ProductWithMeta } from "@/lib/types";

interface Recommendation {
  id: string;
  name: string;
  reason: string;
}

interface Message {
  role: "user" | "stylist";
  content: string;
  recommendations?: Recommendation[];
}

const PROMPT_SUGGESTIONS = [
  "Board meeting in Accra",
  "Minimal luxury dinner",
  "Traditional engagement outfit",
  "Creative founder aesthetic",
  "Modern executive look",
  "Evening gala attire",
];

export default function StylistPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "stylist",
      content:
        "Welcome to the Mensah Atelier. I am your personal stylist, here to assist you in articulating your presence through textile and form. How may I refine your look today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductWithMeta[]>([]);
  const [lookbook, setLookbook] = useState<ProductWithMeta[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();

  useEffect(() => {
    getProducts().then((raw) => setProducts(enrichProducts(raw)));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMessage = text.trim();
    setInput("");

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    const history = messages.map((m) => ({
      role: m.role === "stylist" ? "assistant" : "user",
      content: m.content,
    }));

    try {
      const res = await fetch("/api/stylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history }),
      });
      const data = await res.json();

      const recs: Recommendation[] = data.recommendations ?? [];
      const matchedProducts = recs
        .map((r: Recommendation) => products.find((p) => p.id === r.id))
        .filter(Boolean) as ProductWithMeta[];

      if (matchedProducts.length > 0) setLookbook(matchedProducts);

      setMessages((prev) => [
        ...prev,
        {
          role: "stylist",
          content: data.message ?? "Allow me a moment to consider your request.",
          recommendations: recs,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "stylist",
          content: "I apologize for the interruption. Please allow me a moment to recalibrate.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-background flex flex-col lg:flex-row">
      {/* Left — Conversation Panel */}
      <div className="flex-1 flex flex-col border-r border-outline-variant/20 max-h-screen">
        {/* Header */}
        <div className="px-8 pt-10 pb-6 border-b border-outline-variant/20">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-tertiary mb-2 block">
            Mensah
          </span>
          <h1 className="font-serif text-3xl text-on-surface">AI Stylist</h1>
          <p className="text-on-surface-variant text-sm opacity-60 mt-1">
            Personalised curation
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                {msg.role === "stylist" && (
                  <div className="w-8 h-8 flex-shrink-0 bg-tertiary/20 border border-tertiary/40 flex items-center justify-center">
                    <span className="text-tertiary text-[10px] font-semibold tracking-widest">M</span>
                  </div>
                )}

                <div className={`max-w-xs lg:max-w-sm ${msg.role === "user" ? "text-right" : ""}`}>
                  {msg.role === "stylist" && (
                    <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-tertiary mb-2">
                      Mensah Stylist
                    </p>
                  )}
                  <div
                    className={`text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "text-on-surface-variant italic"
                        : "text-on-surface"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="w-8 h-8 flex-shrink-0 bg-tertiary/20 border border-tertiary/40 flex items-center justify-center">
                  <span className="text-tertiary text-[10px] font-semibold">M</span>
                </div>
                <div className="flex items-center gap-1.5 pt-2">
                  {[0, 0.2, 0.4].map((delay) => (
                    <motion.div
                      key={delay}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay }}
                      className="w-1.5 h-1.5 rounded-full bg-tertiary"
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Suggestions */}
        <div className="px-8 pb-4">
          <div className="flex flex-wrap gap-2">
            {PROMPT_SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                disabled={loading}
                className="text-[10px] font-semibold tracking-[0.06em] uppercase px-3 py-1.5 border border-outline-variant/40 text-on-surface-variant hover:border-tertiary hover:text-tertiary transition-all duration-200 disabled:opacity-30"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="px-8 py-6 border-t border-outline-variant/20">
          <div className="flex items-center gap-4 border-b border-outline-variant/40 pb-3 focus-within:border-tertiary transition-colors duration-300">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Describe your occasion, aesthetic, or mood..."
              disabled={loading}
              className="flex-1 bg-transparent text-on-surface text-sm placeholder:text-on-surface-variant placeholder:opacity-40 outline-none disabled:opacity-50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className="text-tertiary hover:opacity-70 transition-opacity disabled:opacity-30"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Right — Lookbook Panel */}
      <div className="w-full lg:w-96 xl:w-[480px] flex flex-col border-l border-outline-variant/20 max-h-screen">
        <div className="px-8 pt-10 pb-6 border-b border-outline-variant/20 flex justify-between items-end">
          <div>
            <h2 className="font-serif text-2xl text-on-surface">Lookbook</h2>
            <p className="text-[10px] font-semibold tracking-[0.1em] uppercase text-on-surface-variant opacity-50 mt-1">
              Dynamically curated
            </p>
          </div>
          {lookbook.length > 0 && (
            <button
              onClick={() => setLookbook([])}
              className="text-[10px] font-semibold tracking-widest uppercase text-on-surface-variant hover:text-tertiary transition-colors"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-8">
          {lookbook.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4 opacity-30">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
              <p className="text-xs tracking-widest uppercase text-center">
                Your curated look will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {lookbook.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <Link href={`/products/${product.id}`} className="flex-shrink-0">
                    <div className="w-20 h-24 bg-surface-container-highest overflow-hidden">
                      <Image
                        src={product.displayImageUrl}
                        alt={product.luxuryName}
                        width={80}
                        height={96}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        unoptimized
                      />
                    </div>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-on-surface-variant opacity-50 mb-1">
                      {product.category}
                    </p>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-serif text-base text-on-surface leading-tight hover:text-tertiary transition-colors">
                        {product.luxuryName}
                      </h3>
                    </Link>
                    <p className="text-tertiary text-sm mt-1">{formatPrice(product.price_minor)}</p>
                    <button
                      onClick={() => addItem(product)}
                      className="mt-2 text-[10px] font-semibold tracking-[0.1em] uppercase border border-outline-variant/40 px-3 py-1.5 text-on-surface-variant hover:border-tertiary hover:text-tertiary transition-all duration-200"
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Reserve CTA */}
              <div className="pt-4 border-t border-outline-variant/20">
                <button
                  onClick={() => lookbook.forEach((p) => addItem(p))}
                  className="w-full bg-primary-container border border-tertiary text-tertiary text-[11px] font-semibold tracking-[0.1em] uppercase py-4 hover:bg-tertiary hover:text-primary-container transition-all duration-500 flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  Reserve the Full Look
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
