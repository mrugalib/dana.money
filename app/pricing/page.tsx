import type { Metadata } from "next";
import PricingTiers from "@/components/PricingTiers/PricingTiers";
import FAQAccordion from "@/components/FAQAccordion/FAQAccordion";
import FinalCTA from "@/components/FinalCTA/FinalCTA";

export const metadata: Metadata = {
  title: "Pricing — Dana AI",
};

/**
 * /pricing route — design.md site map item 12 (Pricing) + 13 (FAQ) + 14b (Final CTA, reused
 * generic chrome, also used on the homepage). Navbar/Footer are global, from app/layout.tsx.
 */
export default function PricingPage() {
  return (
    <main>
      <PricingTiers />
      <FAQAccordion />
      <FinalCTA />
    </main>
  );
}
