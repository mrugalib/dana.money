import type { Metadata } from "next";
import DanaLabHero from "@/components/DanaLabHero/DanaLabHero";
import DanaLabCapabilities from "@/components/DanaLabCapabilities/DanaLabCapabilities";
import DanaLabLending from "@/components/DanaLabLending/DanaLabLending";
import DanaLabCTA from "@/components/DanaLabCTA/DanaLabCTA";

export const metadata: Metadata = {
  title: "Dana Labs — Dana AI",
};

/**
 * /lab route — real Dana Labs content, sourced directly from the live dana.money/lab page
 * (fetched and transcribed, not invented — see each section component's header comment for its
 * exact source mapping). Replaces the earlier honest-placeholder ComingSoon page now that real
 * copy exists to publish. Navbar/Footer are global, from app/layout.tsx.
 */
export default function LabPage() {
  return (
    <main>
      <DanaLabHero />
      <DanaLabCapabilities />
      <DanaLabLending />
      <DanaLabCTA />
    </main>
  );
}
