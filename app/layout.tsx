import type { Metadata } from "next";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ScrollRevealInit from "@/components/shared/ScrollRevealInit";
import SmoothScroll from "@/components/shared/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dana AI",
  description:
    "Dana is an AI financial advisor bringing AI-powered financial access to people traditional banking overlooks.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@600;700&display=swap"
          rel="stylesheet"
        />
        {/* AirbnbCereal_W_Bd (design.md §3) is proprietary/unlicensed — intentionally not loaded
            here; --font-display falls back to generic sans-serif, see design.md §9. */}
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <ScrollRevealInit />
        <SmoothScroll />
      </body>
    </html>
  );
}
