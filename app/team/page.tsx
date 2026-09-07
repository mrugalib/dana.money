import type { Metadata } from "next";
import TeamGrid from "@/components/TeamGrid/TeamGrid";

export const metadata: Metadata = {
  title: "Team — Dana AI",
};

/**
 * /team route — real founder bios supplied by Dana (name/title/photo/bio for both co-founders).
 * Previously shipped as a ComingSoon placeholder because no bios existed yet; see git history.
 * Navbar/Footer are global, from app/layout.tsx.
 */
export default function TeamPage() {
  return (
    <main>
      <TeamGrid />
    </main>
  );
}
