import type { Metadata } from "next";
import MediaGrid from "@/components/MediaGrid/MediaGrid";

export const metadata: Metadata = {
  title: "Media — Dana AI",
};

/**
 * /media route — replaces the old redirect-to-ComingSoon placeholder now that there's real
 * content: Dana's actual press coverage/award recognition, sourced from the live media API (see
 * MediaGrid.tsx build notes). Navbar/Footer are global, from app/layout.tsx.
 */
export default function MediaPage() {
  return (
    <main>
      <MediaGrid />
    </main>
  );
}
