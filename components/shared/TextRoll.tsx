/**
 * Dana AI — "text roll" hover primitive: on hover/focus of the ancestor link or button, the
 * visible label rolls upward out of view while an identical duplicate rolls up into its place.
 * Pure CSS (`.text-roll` in app/globals.css) — no client JS needed. The duplicate is
 * `aria-hidden` so screen readers only ever see the label once.
 */
export default function TextRoll({ children }: { children: string }) {
  return (
    <span className="text-roll">
      <span className="text-roll__line text-roll__line--in">{children}</span>
      <span className="text-roll__line text-roll__line--out" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
