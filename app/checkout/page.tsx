"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cart-store";
import { formatPrice } from "@/lib/api";

type Step = "review" | "details" | "confirm";

export default function CheckoutPage() {
  const { items, totalMinor, clearCart } = useCartStore();
  const [step, setStep] = useState<Step>("review");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    note: "",
  });

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please provide your name and phone number.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/basket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchant_id: "mensah",
          items: items.map((i) => ({
            item_id: i.product.id,
            qty: i.quantity,
          })),
          customer_name: form.name,
          customer_phone: form.phone,
          customer_note: form.note,
          team_slug: "mensah-gh",
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Order failed");

      setWhatsappUrl(data.whatsappUrl);
      setStep("confirm");
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && step !== "confirm") {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-margin-desktop">
        <div className="text-center">
          <p className="font-serif text-2xl text-on-surface mb-4">Your selection is empty.</p>
          <Link
            href="/collections"
            className="text-[11px] font-semibold tracking-[0.1em] uppercase text-tertiary border-b border-tertiary/30 pb-1"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-section-gap">
      <div className="max-w-[1440px] mx-auto px-margin-desktop">
        {/* Header */}
        <div className="pt-12 pb-10 border-b border-outline-variant/20 mb-12">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-tertiary mb-3 block">
            Mensah Atelier
          </span>
          <h1 className="font-serif text-4xl text-on-surface">
            Complete Your Order
          </h1>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center gap-4 mb-12">
          {(["review", "details", "confirm"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${step === s ? "text-tertiary" : step === "confirm" || (step === "details" && i === 0) ? "text-on-surface-variant opacity-50" : "text-on-surface-variant opacity-30"}`}>
                <div className={`w-5 h-5 flex items-center justify-center text-[10px] font-semibold border ${step === s ? "border-tertiary text-tertiary" : "border-outline-variant/40"}`}>
                  {i + 1}
                </div>
                <span className="text-[10px] font-semibold tracking-[0.1em] uppercase hidden sm:block">
                  {s === "review" ? "Review" : s === "details" ? "Details" : "Confirm"}
                </span>
              </div>
              {i < 2 && <div className="w-8 h-px bg-outline-variant/30" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16">
          {/* Left — Step Content */}
          <div>
            <AnimatePresence mode="wait">
              {step === "review" && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="font-serif text-2xl text-on-surface mb-8">Your Selection</h2>
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-6 pb-6 border-b border-outline-variant/20">
                        <div className="w-24 h-28 bg-surface-container-highest flex-shrink-0 overflow-hidden">
                          <Image
                            src={item.product.displayImageUrl}
                            alt={item.product.luxuryName}
                            width={96}
                            height={112}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-[10px] font-semibold tracking-widest uppercase text-on-surface-variant opacity-50 mb-1">
                            {item.product.category}
                          </p>
                          <h3 className="font-serif text-lg text-on-surface">{item.product.luxuryName}</h3>
                          <p className="text-tertiary text-sm mt-1">
                            {formatPrice(item.product.price_minor)} × {item.quantity}
                          </p>
                          <p className="text-on-surface text-sm mt-1 font-medium">
                            {formatPrice(item.product.price_minor * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep("details")}
                    className="mt-8 bg-primary-container border border-tertiary text-tertiary text-[12px] font-semibold tracking-[0.1em] uppercase px-10 py-5 hover:bg-tertiary hover:text-primary-container transition-all duration-500 flex items-center gap-3"
                  >
                    Continue
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </motion.div>
              )}

              {step === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="font-serif text-2xl text-on-surface mb-8">Your Details</h2>
                  <div className="space-y-8 max-w-md">
                    {[
                      { id: "name", label: "Full Name", placeholder: "Your name", type: "text" },
                      { id: "phone", label: "WhatsApp Number", placeholder: "+233 XX XXX XXXX", type: "tel" },
                    ].map(({ id, label, placeholder, type }) => (
                      <div key={id} className="border-b border-outline-variant/40 focus-within:border-tertiary transition-colors pb-2">
                        <label className="block text-[10px] font-semibold tracking-[0.1em] uppercase text-on-surface-variant opacity-60 mb-2">
                          {label}
                        </label>
                        <input
                          type={type}
                          placeholder={placeholder}
                          value={form[id as keyof typeof form]}
                          onChange={(e) => setForm((f) => ({ ...f, [id]: e.target.value }))}
                          className="w-full bg-transparent text-on-surface text-base outline-none placeholder:text-on-surface-variant placeholder:opacity-30"
                        />
                      </div>
                    ))}
                    <div className="border-b border-outline-variant/40 focus-within:border-tertiary transition-colors pb-2">
                      <label className="block text-[10px] font-semibold tracking-[0.1em] uppercase text-on-surface-variant opacity-60 mb-2">
                        Order Note <span className="opacity-50">(Optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Any specific requirements or styling requests..."
                        value={form.note}
                        onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                        className="w-full bg-transparent text-on-surface text-base outline-none placeholder:text-on-surface-variant placeholder:opacity-30 resize-none"
                      />
                    </div>

                    {error && (
                      <p className="text-error text-sm">{error}</p>
                    )}

                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep("review")}
                        className="border border-outline-variant/40 text-on-surface-variant text-[11px] font-semibold tracking-[0.1em] uppercase px-6 py-4 hover:border-on-surface transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex-1 bg-primary-container border border-tertiary text-tertiary text-[12px] font-semibold tracking-[0.1em] uppercase py-4 hover:bg-tertiary hover:text-primary-container transition-all duration-500 disabled:opacity-50 flex items-center justify-center gap-3"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 border border-tertiary/40 border-t-tertiary rounded-full animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Continue to WhatsApp
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "confirm" && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 border border-tertiary/40 bg-tertiary/10 flex items-center justify-center mx-auto mb-8">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e9c176" strokeWidth="1.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-tertiary mb-4 block">
                    Order Confirmed
                  </span>
                  <h2 className="font-serif text-3xl text-on-surface mb-4">
                    Your order is ready.
                  </h2>
                  <p className="text-on-surface-variant max-w-sm mx-auto leading-relaxed mb-10 opacity-70">
                    Continue to WhatsApp to complete your purchase with a Mensah stylist. Your selections have been prepared for review.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#25D366] text-white text-[12px] font-semibold tracking-[0.1em] uppercase px-10 py-5 hover:bg-[#20BA5A] transition-all duration-300"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Continue on WhatsApp
                  </a>
                  <div className="mt-8">
                    <Link
                      href="/collections"
                      className="text-[10px] font-semibold tracking-widest uppercase text-on-surface-variant hover:text-tertiary transition-colors border-b border-outline-variant/30 pb-1"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right — Order Summary */}
          {step !== "confirm" && (
            <div className="bg-surface-container-low border border-outline-variant/20 p-8 h-fit sticky top-28">
              <h3 className="font-serif text-xl text-on-surface mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-start text-sm">
                    <div>
                      <p className="text-on-surface">{item.product.luxuryName}</p>
                      <p className="text-on-surface-variant opacity-50 text-xs mt-0.5">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-on-surface ml-4 flex-shrink-0">
                      {formatPrice(item.product.price_minor * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t border-outline-variant/20 pt-4 flex justify-between items-center">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-on-surface-variant">
                  Total
                </span>
                <span className="font-serif text-xl text-on-surface">
                  {formatPrice(totalMinor())}
                </span>
              </div>
              <p className="text-[10px] tracking-wider text-on-surface-variant opacity-40 uppercase mt-4 text-center">
                Final payment confirmed via WhatsApp
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
