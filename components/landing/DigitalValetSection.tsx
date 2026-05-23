"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function DigitalValetSection() {
  const router = useRouter();
  const [occasion, setOccasion] = useState("");
  const [aesthetic, setAesthetic] = useState("Minimalist Executive");
  const [atmosphere, setAtmosphere] = useState("Commanding & Sharp");

  function handleGenerate() {
    const params = new URLSearchParams({ occasion, aesthetic, atmosphere });
    router.push(`/stylist?${params.toString()}`);
  }

  return (
    <section id="valet" className="py-section-gap bg-surface-container">
      <div className="max-w-[1440px] mx-auto px-margin-desktop">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-on-surface mb-4">
            The Digital Valet
          </h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/40">
            Intelligent Wardrobe Orchestration
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="border border-outline-variant/20 p-8 md:p-12"
        >
          <div className="space-y-10">

            <div className="border-b border-outline-variant/20 pb-6">
              <label className="text-[10px] uppercase tracking-widest text-tertiary mb-4 block">
                What is the occasion?
              </label>
              <input
                type="text"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="e.g. A board meeting in Accra, followed by a private dinner"
                className="w-full bg-transparent font-serif text-xl md:text-3xl text-on-surface focus:outline-none placeholder:text-on-surface/15"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="border-b border-outline-variant/20 pb-6">
                <label className="text-[10px] uppercase tracking-widest text-tertiary mb-4 block">
                  Preferred Aesthetic
                </label>
                <select
                  value={aesthetic}
                  onChange={(e) => setAesthetic(e.target.value)}
                  className="w-full bg-transparent font-serif text-xl text-on-surface focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="Minimalist Executive">Minimalist Executive</option>
                  <option value="Modern Traditionalist">Modern Traditionalist</option>
                  <option value="Creative Director">Creative Director</option>
                </select>
              </div>
              <div className="border-b border-outline-variant/20 pb-6">
                <label className="text-[10px] uppercase tracking-widest text-tertiary mb-4 block">
                  Atmosphere
                </label>
                <select
                  value={atmosphere}
                  onChange={(e) => setAtmosphere(e.target.value)}
                  className="w-full bg-transparent font-serif text-xl text-on-surface focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="Commanding & Sharp">Commanding &amp; Sharp</option>
                  <option value="Understated Luxury">Understated Luxury</option>
                  <option value="Relaxed Sophistication">Relaxed Sophistication</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={handleGenerate}
                className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-on-surface hover:text-tertiary transition-colors duration-300"
              >
                Generate Styling Profile
                <span className="h-px w-12 bg-tertiary group-hover:w-20 transition-all duration-500 inline-block" />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
