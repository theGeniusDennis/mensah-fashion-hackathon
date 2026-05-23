import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mensah — Luxury Menswear",
  description:
    "Tailored intelligence for the modern gentleman. Discover premium menswear through an intelligent digital concierge experience.",
  keywords: ["luxury menswear", "tailored suits", "African fashion", "bespoke"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bodoniModa.variable} ${inter.variable} dark`}
    >
      <body className="bg-background text-on-surface font-sans antialiased min-h-screen">
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
      </body>
    </html>
  );
}
