import type { Metadata } from "next";
import CareerInfo from "@/components/CareerInfo/CareerInfo";

export const metadata: Metadata = {
  title: "Careers — Dana AI",
};

/**
 * /career route — replaces the old redirect-to-ComingSoon placeholder now that there's real
 * content: what Dana offers employees (compensation, time off, perks, culture), followed by an
 * explicit "not hiring right now" notice. Navbar/Footer are global, from app/layout.tsx.
 */
export default function CareerPage() {
  return (
    <main>
      <CareerInfo />
    </main>
  );
}
