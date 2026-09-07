# Dana AI — Design System (design.md)

This is the single source of truth for how the redesigned dana.money should look, feel, and behave.
Every component built for this project must trace back to a rule in this file. If a situation isn't
covered here, the agent should extend the system in its existing spirit rather than invent an
unrelated pattern — then log the addition at the bottom of this file under "System Extensions."

---

## 1. Positioning & Tone

Dana is an AI financial advisor, not a generic budgeting app. The design must read as:
**premium, trustworthy, calm, intelligent** — closer to a private banking product than a
consumer utility app. Every visual decision should answer: "Would this make someone trust Dana
with their financial data?"

Reference DNA (Finorix primary, Zova + Verseo secondary): pill-badge eyebrow → confident headline →
dual CTA → real product visual in a device frame → logo trust bar → problem/solution narrative →
icon feature grid → alternating proof blocks → numbered process → animated stat counters →
testimonial social proof → transparent pricing → FAQ → final CTA → rich footer.

Dana's own strengths to preserve: real app screenshots (never replace with stock photography),
the AI-chat hook, the expert/human layer, the rewards/gamification angle (spin wheel, gift box).

---

## 2. Color System

Verified token export from Finorix's live site (https://finorix.framer.website/#about) — full
light theme. Premium feel comes from generous white space, one restrained accent duo (electric
blue + dark green) used consistently, lime reserved as a single loud highlight used sparingly, and
very soft neutral shadows for elevation rather than a dark canvas or glow.

```css
--color-bg-base:        #FFFFFF;
--color-bg-elevated:    #F8F8F8;   /* neutral card surface — NOT a bold color block, see §9 */
--color-bg-glass:       rgba(0,0,0,0.04);
--color-border-subtle:  rgba(0,0,0,0.08);
--color-border-glow:    rgba(0,0,238,0.35);   /* interactive-state ring (hover/focus) only, see §5.2 */

--color-text-primary:   #000000;
--color-text-secondary: #1B3A1C;  /* solid dark green, not a translucent tint */
--color-text-muted:     rgba(0,0,0,0.42); /* fails AA at normal text sizes — icons/decoration only, see §9 */

--color-accent-primary:   #0000EE; /* electric blue */
--color-accent-secondary: #1B3A1C; /* dark green — same value as text-secondary, different role */

--color-primary: #1B3A1C; /* solid brand fill for buttons, final-CTA banner, other bold blocks */
--on-primary:    #FFFFFF; /* required text color for anything filled with --color-primary */

--color-surface-highlight: #B9E848; /* lime — badges, eyebrow pills, small highlight chips ONLY.
  Too vivid for card/section backgrounds; never use as a general surface fill, see §9. */

--gradient-brand: linear-gradient(135deg, #0000EE 0%, #1B3A1C 100%);
--gradient-glow:  radial-gradient(circle at 50% 0%, rgba(0,0,238,0.12), transparent 60%);

--color-success: #4ADE80;
--color-warning: #FBBF24;
--color-danger:  #F87171;
```

The brand relies on exactly two accent hues (electric blue + dark green) used consistently across
icons, chart lines, gradient text-fill, and button fills — `--color-surface-highlight` (lime) is
**not** a third accent; it is a single, deliberately loud highlight color confined to small chip-
scale surfaces. Never place body text or a large content block directly on lime — verified safe
uses are black or dark-green text on a lime chip (14.7:1 / 8.8:1), never the reverse.

---

## 3. Typography

Two-font system, measured from Finorix's live site — one display face for headlines, one
workhorse face for body/UI. Both lean bold and tight-tracked (negative letter-spacing), which is
a deliberate, distinctive part of Finorix's type feel — don't loosen it back to typical SaaS
defaults.

- **Display**: `AirbnbCereal_W_Bd, sans-serif` (weight 700) — the exact fallback stack per the
  verified export. Note: this is Airbnb's own proprietary commissioned typeface; Dana almost
  certainly has no license to embed the actual font file, so without one supplied, browsers render
  every display heading in generic `sans-serif` (the stack's declared fallback) at the specified
  size/weight/spacing — visually fine, just not literally Cereal. See §9. Used only for H1/H2 and
  hero numerals/stat counters.
- **Body/UI**: `Manrope` (weight 600) — used for paragraphs, nav, buttons, form fields. Finorix
  runs body copy at a single semibold weight throughout rather than a typical 400 — keep that: 600
  is the standard body weight, not a "bold" exception.

Scale (desktop / mobile) — `display-xl`, `display-lg`, and `body-md`/`body-lg` are Finorix's
directly measured, verified values below. `display-md` and `caption` are held at their prior
values until Finorix supplies a measurement for them (see §9):
| Token | Desktop | Mobile | Weight | Letter-spacing | Use |
|---|---|---|---|---|---|
| `--text-display-xl` | 52px / 1.16 | 32px / 1.2 | 700 | -0.52px | Hero H1 (measured) |
| `--text-display-lg` | 42px / 1.0 | 28px / 1.05 | 700 | -0.42px | Section H2 (measured) |
| `--text-display-md` | 28px / 1.2 | 22px / 1.25 | 700 | -0.01em | Card / subsection heads (unconfirmed, held) |
| `--text-body-lg` | 16px / 1.38 | 16px / 1.38 | 600 | -0.32px | Lead paragraphs (measured — now same size as body-md, see §9) |
| `--text-body-md` | 16px / 1.38 | 16px / 1.38 | 600 | -0.32px | Standard body (measured) |
| `--text-caption` | 13px / 1.4 | 13px / 1.4 | 600 | +0.04em, uppercase | Eyebrow labels, badges (unconfirmed, held) |

Rules:
- Headlines never exceed 3 lines; break lines deliberately at clause boundaries (as Dana's current
  "Your Smart / Financial / AI Assistant" tries to do), but pair with a lighter-weight or
  secondary-color span on the final line for hierarchy — don't leave three lines the same weight.
  Fix: `Your smart` (secondary tone) / `**Financial AI**` (primary, `--gradient-brand` text-fill —
  verified safe across the whole gradient, 9.4:1 minimum against the white canvas, see §9) /
  `Assistant.` (secondary tone).
- Never center-align body paragraphs longer than one line.
- Letter-spacing on eyebrow/badge text stays `+0.04em` uppercase (unchanged) — this is the one
  place tracking goes positive instead of Finorix's tight negative tracking elsewhere.

---

## 4. Spacing & Grid

- Base unit: `4px` (was `8px`). Preferred discrete steps, per the verified export:
  `8, 12, 20, 24, 28, 32, 100px` — reach for one of these first; any other value must still be a
  multiple of 4. (Dana's pre-existing larger layout constants below — max width, gutters, section
  rhythm — predate this scale and aren't part of it; they're unchanged and still multiples of 4.)
- Max content width: `1280px`, gutters `24px` mobile / `64px` desktop.
- Section vertical rhythm: `120px` desktop top+bottom padding, `72px` mobile.
- Grid: 12-column on desktop, 4-column on mobile, 24px gutters.
- Breakpoints: `810px` (mobile cutover — hero/section stacking, most single-breakpoint components)
  and `1200px` (tablet cutover — 3-tier components use this where 810 alone leaves a genuinely
  cramped mid-width zone: navbar's hamburger threshold, and feature-grid/trust-bar's 4-col→2-col
  step). Not every component needs all three tiers — use 1200 only where the 810-1200 zone would
  otherwise overflow or force text into unreasonably narrow columns; a simple 2-tier mobile/desktop
  split is still correct for anything without that failure mode. See §9 for the breakpoint audit.
- Radius scale (replaces the old `20/12/999`): `sm` `10px` (small chips), `md` `16px` (standard
  cards), `lg` `24px`, `xl` `28px` (large feature cards), `pill` `9999px` (buttons/badges).
- Shadow (elevation, replaces border-glow-on-hover for static surfaces): card and elevated
  surfaces use `0 4px 40px rgba(0,0,0,0.02)` at rest — see `--shadow-card` in §9. On card hover,
  deepen to `--shadow-card-hover` (`0 12px 40px rgba(0,0,0,0.08)`, not a Finorix value, see §9)
  instead of a border-glow. `--color-border-glow` is reserved for interactive states only
  (button/link hover and focus), not static card definition.

---

## 5. Core Components

### 5.1 Navbar
Sticky, transparent-to-glass on scroll (blur backdrop, `--color-bg-glass` fill after 40px scroll).
Logo left, 4–5 nav links center/left-of-CTA, single primary CTA button right ("Get Dana AI").
On mobile: hamburger → full-screen glass menu.

### 5.2 Buttons
- **Primary**: solid `--color-primary` (dark green) fill, `--on-primary` (white) text — **not**
  lime; lime is reserved for badges/chips only (see §2). `9999px` (`--radius-pill`) radius, 16/32
  padding, subtle glow shadow on hover (`box-shadow: 0 0 24px var(--color-border-glow)`, blue),
  scale 1.02 on hover.
- **Secondary/ghost**: 1px `--color-border-subtle`, transparent fill, text `--color-text-primary`,
  plus `--shadow-card` as a resting-state depth cue (the border alone is very faint against a pure
  white page — see §9's contrast note). Border brightens to `--color-border-glow` on hover.
- Never use more than one primary button per viewport section.

### 5.3 Badge / Eyebrow Pill
Small pill, `--color-bg-glass` fill, 1px border, caption text, optional small dot/icon. Sits above
every major section headline — this is a signature repeated motif, must appear identically styled
every time.

### 5.4 Hero
Two-column desktop (text left, product visual right) collapsing to stacked mobile. Product visual =
real Dana app screenshot inside a crafted device frame (phone mockup with subtle bezel + soft drop
shadow + faint gradient glow behind it, replacing the current raw hero.gif). Optional: swap the gif
for a short looped micro-interaction (chat bubbles typing in) rather than a static recording.
Dual CTA: primary ("Get Dana AI") + secondary ("See how it works" → scrolls to process section).

### 5.5 Trust Bar
Logo marquee (auto-scrolling, infinite loop, grayscale logos that brighten on hover) directly under
hero. If Dana lacks partner/press logos yet, substitute with a stat strip instead (users, loans
disbursed, avg. rating) — never leave this slot empty; it is the first trust signal after the hero.

### 5.6 Feature Grid
3–4 column card grid. Each card: icon (line-style, `--color-accent-primary` blue or
`--color-accent-secondary` dark green, 24–32px) → title (`--text-display-md`,
`--color-text-primary`) → 1–2 line description (`--text-body-md`, `--color-text-secondary`). Cards
use `--color-bg-elevated` (`#F8F8F8`, a neutral card surface — not a bold color block, see §9) with
`--color-border-subtle` + `--shadow-card`; on hover, lift `translateY(-4px)` — border-glow is
reserved for interactive controls (buttons/links), not static card hover, see §4.

### 5.7 Alternating Proof Sections
Full-bleed sections alternating text-left/visual-right and text-right/visual-left. Each pairs a
claim + supporting real screenshot or generated UI mock (never stock photography of "people using
phones" — always product-real or product-realistic visuals).

### 5.8 Numbered Process ("How It Works")
Horizontal 3-step flow on desktop (numbered `01/02/03` in large display type, `--gradient-brand`
text-fill on the numeral — verified safe, see §2/§9), stacked vertical on mobile, connected by a
thin `--gradient-brand` line/arrow (a decorative stroke, not text — no contrast constraint applies).
This directly fixes Dana's current one-sentence "How It Works" gap.

### 5.9 Stat / Metrics Section
Large display-type numbers with count-up animation on scroll-into-view, each paired with a one-line
label. Use this to surface: active users, cashflow scores generated, loans facilitated, avg. rating.
Mirrors Finorix's "Key metrics behind our success" block — this is mandatory, not optional.

### 5.10 Testimonial Carousel
Card-based, auto-advancing or swipeable, avatar + name + role + 1–2 sentence quote + optional 5-star
rating. Glass card style consistent with feature cards.

### 5.11 Pricing (if Dana surfaces pricing publicly)
Monthly/Annual toggle **if a real annual rate exists** (none has been published — ship monthly-only
rather than fabricate one, see §9), 2–3 tier cards, one visually "highlighted" (solid
`--color-accent-primary` border — not `--color-border-glow`, which is reserved for interactive
hover/focus states, not static card definition, see §4 — + slightly raised) as the recommended
tier. Feature list uses check-icon in `--color-accent-primary` (blue) — updated from lime this
round per explicit instruction, see §9.

### 5.12 FAQ Accordion
Single-open accordion, smooth height transition (~250ms ease), plus-to-x icon rotation. Must include
finance-specific trust questions: data privacy, how credit/loan eligibility works, security standard,
what "cashflow score" means.

### 5.13 Final CTA Banner
Full-width, `--color-primary` (dark green) background block with `--on-primary` (white) headline,
centered, `--gradient-glow` behind it, + single primary CTA. **On this banner only**, invert the
CTA fill — `--color-bg-base` (white) background with `--color-primary` (dark green) text — since
the default primary-button fill is the same dark green as this banner's own background and would
be invisible on it (see §9). Last content section before footer.

### 5.14 Footer
Multi-column: logo + one-line mission statement + newsletter input, then link columns (Product,
Company, Legal, Contact), social icons, security/compliance badges row if available, copyright line.

---

## 6. Motion Principles

Base easing is `ease` (was a custom ease-out curve — see §9; the `--ease-out` token name is kept
for backward compatibility even though its value changed). Durations and triggers are unchanged.

- **Scroll reveal**: elements fade+translateY(16px→0) on entering viewport, 400–600ms ease,
  staggered 80–120ms per sibling in a grid/list. Never animate more than once per element per visit.
- **Hover**: cards lift `translateY(-4px)` (no border-glow — that's reserved for interactive
  controls, see §4/§5.6); buttons scale 1.02 + glow shadow (border-glow, correct here).
- **Counters**: animate numeric value from 0 to target over ~1.2s when scrolled into view, ease.
- **Marquee**: constant-speed linear scroll, pause on hover.
- **Accordion**: height auto-transition ~250ms ease-in-out (unchanged — deliberately distinct from
  the base easing), icon rotate 45deg.
- Respect `prefers-reduced-motion`: disable non-essential transforms, keep opacity fades only.

---

## 7. Imagery Style

- Always prefer Dana's real product UI over illustration or stock photography.
- Device frames: consistent bezel style across the whole site (pick one phone frame asset and reuse
  it everywhere — never mix frame styles between sections).
- Background treatment: `--gradient-glow` (faint radial blue blur) behind the hero and CTA sections
  only — not on every section, or it stops feeling premium and starts feeling busy. Card/surface
  elevation itself still comes from `--shadow-card`, a very soft, near-invisible neutral shadow —
  glow is for hero/CTA atmosphere, shadow is for card/surface depth; don't conflate the two.
- Icons: single line-style icon set throughout (e.g. Phosphor or Lucide), never mix icon families.

---

## 8. Site Map (recommended section order)

1. Navbar
2. Hero (headline + dual CTA + device mockup)
3. Trust bar (logos or stats)
4. Problem → Solution narrative (short, 2–3 lines, sets up why AI-driven finance matters)
5. AI Advisor feature block (Dana's existing "chat with Dana" content, elevated visually)
6. Feature grid (cashflow score, personalized loans, rewards, expert guidance)
7. How It Works (numbered 3-step flow)
8. Rewards / Learn & Earn (gift box, spin wheel — keep Dana's gamification, style it consistently)
9. Meet the Experts (existing content, styled as a proper team/trust grid, not a loose photo row)
10. Metrics / stats section
11. Testimonials
12. Pricing (if applicable) or "Get the App" comparison of plan tiers
13. FAQ
14. Get The App (real content: "GET THE APP" headline, Google Play/App Store links — distinct
    from the generic Final CTA banner immediately after it; both exist, see §9)
14b. Final CTA Banner (§5.13) — generic, reused on /pricing too
15. Footer

---

## 9. System Extensions

*(Agents: log any new pattern introduced during build here, with rationale, so the system stays
consistent for future sessions.)*

- **Verified Finorix token export adopted — full light theme (current, supersedes all prior
  palette/typography/spacing passes below)**. Rationale: replaced two earlier approximate passes
  (a dark-canvas "Florix" accent swap, then a partial light-mode guess-mapping) with Finorix's
  actual verified export across color, typography, spacing, radius, shadow, motion, and
  breakpoints. History of what those earlier passes got wrong, superseded now:
  - `--color-bg-elevated` was previously mapped to a bold dark green (`#1B3A1C`, guessed as
    Finorix's "primary" role) and used for bold color-block surfaces (dropdown panels, chat-mock
    shell) with a companion `--color-text-on-elevated` token. The verified export puts
    `bg-elevated` at `#F8F8F8` — a neutral, barely-there card tint, not a bold block — so
    `--color-text-on-elevated` is **removed**: `--color-text-primary` (black) now works directly on
    `bg-elevated` (12.6:1 either way, since F8F8F8 and white differ by only ~1.06:1 luminance-wise).
    `--color-primary` (`#1B3A1C`) + `--on-primary` (`#FFFFFF`) are new tokens that now carry the
    "bold brand-color block" role bg-elevated used to play (buttons, final-CTA banner).
  - `--color-accent-primary`/`-secondary` previously held lime/blue; the verified export swaps them
    to blue/dark-green, and lime becomes the separate, restricted `--color-surface-highlight`
    (badges/chips only — see §2). Every prior lime-as-accent use site was re-pointed: primary
    button fill → `--color-primary` (dark green) + `--on-primary` (white), chat-mock's "user"
    bubble → same pairing (was lime + black), badge eyebrow dot → `--color-surface-highlight`
    (correctly lime again, since that's exactly its intended use), pricing check-icon → same.
  - Gradient tokens (`--gradient-brand`, `--gradient-glow`) were previously **removed** on the
    (incorrect) assumption that Finorix has no gradients. The verified export confirms both exist
    with real values, both stops now landing in the same low-luminance range (blue 0.062, dark
    green 0.033) — unlike the earlier lime→blue gradient, which spanned bright-to-dark and made
    dark CTA text illegible at one end (2.1:1) and white text illegible at the other (1.4:1). This
    new gradient is verified safe as a text-fill against the white canvas at every point (9.4:1
    minimum, checked at 0/25/50/75/100%) — reinstated for the hero headline emphasis line and the
    numbered-process numeral/connector (§5.8), and available for hero/CTA ambient glow (§7). It is
    *not* used for the button fill, which is solid per this pass's explicit instruction.
  - `--shadow-card` (`0 4px 40px rgba(0,0,0,0.02)`) is Finorix's own measured card/elevated shadow
    value, unchanged from the prior pass (it happened to already be correct). `--shadow-elevated`
    remains an alias of it. `--shadow-visual` (`0 24px 48px rgba(0,0,0,0.18)`, the hero device's
    drop shadow) is a Dana-specific derivation with no Finorix equivalent at that visual scale —
    left as-is, out of scope for this pass.
  - Radius (`sm 10 / md 16 / lg 24 / xl 28 / pill 9999`), spacing base (`4px`, preferred steps
    `8/12/20/24/28/32/100`), and breakpoints (`810px`/`1200px`) — flagged last pass as "available
    but not applied," now adopted. Existing `--space-1`…`--space-15` tokens keep their current
    pixel values unchanged (they predate and aren't part of Finorix's component-spacing scale);
    new `--space-12`/`--space-20`/`--space-28`/`--space-100` tokens were added for the previously-
    missing steps. The nav/hero collapse breakpoint moved from an ad-hoc `960px` to the documented
    `810px` — narrower than before, so the 6-item desktop nav has less room before collapsing;
    flagged as unverified in a real browser (no visual regression testing was possible this pass).

- **Display font kept literal, not substituted** — `AirbnbCereal_W_Bd, sans-serif` is used exactly
  as specified (§3), reversing the prior pass's substitution to Plus Jakarta Sans. It's still
  Airbnb's proprietary typeface with no font file supplied, so absent a licensed embed, browsers
  render the generic `sans-serif` fallback — functionally fine (size/weight/spacing still apply),
  just not literally Cereal until a real font file is licensed and added.

- **Known accessibility gap: `--color-text-muted` (`rgba(0,0,0,0.42)`)** — flattens to ~3.0:1
  against both `bg-base` and `bg-elevated`, which fails WCAG AA for normal-size text (needs 4.5:1)
  and only just clears the large-text/non-text 3:1 threshold. It is a verified token value, not
  something to silently alter — currently only used for decorative icon/dot fills (nav chevron,
  chat-mock typing dots), never for actual caption or label copy, which keeps current usage safe.
  Do **not** assign `text-muted` to any readable text (footnotes, timestamps, captions) without
  darkening it first or confirming size ≥18.66px bold / 24px regular.

- **Problem/Solution Narrative component (new — no §5.x spec existed)** — site map item 4 only had
  a one-line description ("short, 2-3 lines, sets up why AI-driven finance matters"), no formal
  component entry. Built as: eyebrow pill (reused verbatim from §5.3, not redeclared) → 2-line
  headline (`--text-display-lg`, solid `--color-text-primary` — deliberately *not* the hero's
  gradient-fill treatment, so that stays special rather than overused, per the anti-pattern list) →
  one supporting sentence (`--text-body-lg`, `--color-text-secondary`). Copy is anchored in Dana's
  real market positioning (underserved-by-formal-credit users in Bangladesh, alternative-data
  affordability assessment), rewritten as original narrative copy, not a quote-block. Layout:
  content column capped at 720px and left-aligned even though the block sits centered on the page —
  avoids centering a paragraph that may wrap to multiple lines (§3's explicit rule), while still
  reading as a centered "divider" between the trust bar and the feature grid.

- **Shared `[data-reveal]` scroll-reveal primitive** (`styles/reveal.css` + `styles/scroll-reveal.js`)
  — extracted once a second section (problem/solution, after the trust bar) needed the same
  scroll-into-view fade+translateY behavior from §6, rather than duplicating the
  opacity/transform/transition rules and IntersectionObserver logic per component. Any element
  below the fold needing this reveal gets `data-reveal` in its markup; the shared script observes
  all of them once, after all components are injected, and unobserves each after its first reveal
  (§6: "never animate more than once per element per visit"). Components still own their own
  stagger delays (`transition-delay` via `:nth-child`) since that varies per layout. This is
  distinct from the hero's on-load reveal (`.hero__content > *` animations in hero.css), which
  plays immediately on page load rather than on scroll, since the hero is above the fold — the two
  mechanisms share visual motion and timing tokens but are triggered differently, and shouldn't be
  merged into one system.

- **AI Advisor feature block (site map item 5) — frame style, revised** — §7 says "pick one phone
  frame asset and reuse it everywhere." The hero already deviates from having an external frame
  asset at all (hero.gif's bezel is baked into its own pixels). This section's real screenshots
  arrived (`assets/Picture1-4.webp`, confirmed as real, unaltered dark-UI product screens — kept
  exactly as-is, not relit for the light page: editing them would fabricate a derivative of real
  UI, and it doubles as a deliberate "spotlight on the product" contrast moment), but
  `hand_phone_frame.png` (dana.money's own real asset name, confirmed via a live fetch of the site)
  still hasn't been provided. Rather than block a second time or invent a third approach, this
  section reuses the CSS-drawn bezel + notch technique already established in
  `hero-visual-chatbubble.css`'s Option B mock — same tokens, same visual language, a real existing
  pattern rather than a new one. **If/when `hand_phone_frame.png` is provided, swap it in and this
  note becomes moot; until then, the CSS bezel is the frame for every proof section, not a second
  style** — still consistent with §7's spirit (one frame approach reused everywhere except the
  hero, which has its own baked-in bezel).

- **New motion pattern: pinned scroll-scrub (desktop + motion-allowed only)** — the AI Advisor
  section locks in the viewport while its 4 screenshots advance one-by-one as scroll position moves
  through a tall track, per explicit instruction ("show one by one while the section is locked").
  Nothing like this exists elsewhere in §6 — the closest prior pattern (a simple auto-cycling
  cross-fade, IntersectionObserver-triggered, no scroll hijacking) is **kept as the mobile and
  `prefers-reduced-motion` fallback**, not replaced: a scroll-scrubbed pin is a much more aggressive
  motion/interaction pattern than anything else in the system, genuinely disorienting on small
  viewports, and exactly the kind of "non-essential motion" reduced-motion users should never see.
  Mechanism (`ai-advisor.js`): a tall `.ai-advisor__track` with a `position: sticky` stage inside
  it; a rAF-throttled scroll listener (same throttling pattern as `navbar.js`'s scroll-glass logic)
  reads real measured `getBoundingClientRect()`/`offsetHeight` each tick and maps scroll progress
  through the track to an active-screen index — not a hardcoded pixel formula, so it stays correct
  regardless of the exact track-height value chosen. Mode switches on resize (desktop↔mobile
  crossing 810px) and re-checks `prefers-reduced-motion` each time. Manual dot controls work
  identically in both modes. This is a genuinely new, more complex pattern than anything else
  documented — flagging plainly rather than quietly treating it as "just another reveal."

- **Feature Grid (site map item 6, spec §5.6) — built with no existing live-site precedent** — per
  SKILL.md rule 7, this design.md-mandated structural section is built even though the live site
  has no dedicated feature-grid with individual cards yet. All four cards' copy is derived from
  confirmed Dana product facts (cashflow-score/alternative-data mechanic from the team page,
  giftbox.png/spinwheel.png context for rewards, the later "Let Experts Guide You" section for
  expert guidance) — flagging explicitly since none of it is pulled from an existing feature-grid.
  - **`--shadow-card-hover`** (`0 12px 40px rgba(0,0,0,0.08)`) — new token, not a Finorix-measured
    value. §4/§5.6 call for replacing card-hover border-glow with "lift + shadow-deepen," but only
    the resting `--shadow-card` value existed; this is a proportionally deeper version of it (same
    blur-radius family, higher offset/opacity) for the hover state specifically.
  - **Icons**: no icon library is loaded in this static build, so all 4 are hand-drawn inline SVGs
    to one consistent stroke recipe (24x24 viewBox, 1.75px stroke, round caps/joins, no fill) — a
    single cohesive family per §7's rule, not sourced from Phosphor/Lucide directly. Colors
    alternate `--color-accent-primary` (blue) / `--color-accent-secondary` (dark green) per card.
  - **Reveal-wrapper/hover-card split**: each grid slot is two nested elements —
    `.feature-grid__item[data-reveal]` (owns the shared scroll-reveal fade+translateY+stagger) and
    an inner `.feature-grid__card` (owns the hover lift+shadow-deepen). This is the first component
    needing both a shared scroll-reveal AND a hover-transform on what would otherwise be the same
    element — putting both `transition` shorthands on one element means whichever wins the cascade
    (equal specificity between `[data-reveal]` and a class selector resolves by source order, i.e.
    whichever stylesheet loads later) discards the other's entirely, silently breaking one
    animation (in this case, it would have killed the opacity fade — the card would pop in
    instantly instead of fading). Two elements avoid the collision outright; future components that
    need both a scroll-reveal and their own hover/interactive transform should follow the same
    split rather than fighting the cascade on one element.

- **How It Works (site map item 7, spec §5.8) — step copy is inferred, not verified** — the live
  site's subhead is the only real content; there is no existing three-step breakdown. The three
  step labels (chat → cashflow-score analysis → matched credit/products/advisors) are inferred from
  Dana's real product description (team page), not pulled from an existing three-step section —
  flagging for Dana's own copy review rather than presenting them as verified final copy.
  - **Connecting line, not threaded through the numerals**: `--gradient-brand` behind a numeral's
    glyph (transparent text-fill with visible stroke gaps) would look messy — the line sits as a
    single straight bar above the row (desktop) / along the left edge (mobile) instead, with a CSS
    border-triangle arrowhead. A CSS triangle can't render a gradient fill, so the arrowhead uses
    the gradient's end-stop color (`--color-accent-secondary`, same hex as the 100% stop) as a
    solid simplification — flagging as a minor, deliberate simplification, not an oversight.
  - **Screenshots renamed** from their original filenames (`How-It Works-Screen-1.webp` — note the
    literal space — plus inconsistent capitalization across the three) to
    `assets/how-it-works-screen-{1,2,3}.webp` for path safety; pixel content untouched. Mapped 1:1
    to steps 01/02/03, not one shared image for the whole section.
  - No `sec3-screens/Picture21.png` reference existed anywhere in this codebase to "drop" — noting
    this in case that instruction was meant for a different session, so a future reader doesn't
    assume a cleanup happened that didn't need to.
  - No reveal/hover cascade-collision risk here (unlike the feature grid): these steps have no
    hover-interactive transform, so `data-reveal` goes directly on `.how-it-works__step` with no
    wrapper split needed.

- **Rewards / Learn & Earn (site map item 8, layout §5.7) — giftbox.png/spinwheel.png missing** —
  neither the original nor an updated version of either file exists anywhere in the project
  (searched `assets/` and the whole repo). Built with clearly-labeled CSS/SVG illustration
  placeholders instead of fabricating stand-ins that pretend to be the real assets: two cards
  (Gift Box, Spin Wheel), each a simple hand-drawn line icon on a `--color-surface-highlight`
  (lime) fill, with a visible caption ("Illustration placeholders — swap for the real
  giftbox.png / spinwheel.png once available") rather than only a code comment, so the pending
  state is honest to anyone viewing the page, not just anyone reading the source. Swap in the real
  files at `/assets/giftbox.png` and `/assets/spinwheel.png` and remove the caption once available.
  This is proof block #2 in the alternating sequence — AI Advisor (block #1) was
  visual-left/text-right, so this alternates to text-left/visual-right, per §5.7.
  - Lime as a **card fill** (not just a chip/badge accent) is a deliberate, explicit exception here
    — sanctioned per this build's instruction ("this section is playful by nature"), still confined
    to two small cards, not the section background, so it doesn't contradict §2's restriction.
  - No reveal/hover cascade-collision risk: these cards have no hover-interactive transform, so
    `data-reveal` goes directly on `.rewards__illustration-card` (same reasoning as How It Works).

- **Let Experts Guide You (site map item 9) — photo-only grid, no names/roles fabricated** — no
  name, role, or bio text exists for any of the six real headshots (`assets/expert1-6.webp`)
  anywhere on the live site or supplied with the assets. Per explicit instruction, this is a
  photo-only grid rather than inventing captions for real people — flagging plainly here (not as
  visible on-page copy: a clean photo grid is presentable and complete-looking as-is, so an
  apologetic "names pending" sentence painted on the live page would leak internal process to end
  users for no benefit; the flag belongs in this log and the build summary, not the page itself).
  **Dana needs to supply real names and roles for these six people before this ships with
  captions.** Reuses the feature grid's exact card visual language (§5.6 tokens) and the same
  reveal-wrapper/hover-card split (§9, Feature Grid entry) to avoid the same transition-shorthand
  cascade collision.

- **Stat / Metrics Section (site map item 10, spec §5.9) — figures pending, not fabricated** — no
  real public numbers exist for active users, cashflow scores generated, loans facilitated, or
  average rating. All four are wired to `STATS_CONFIG` in `metrics.js` (single source of truth,
  currently all zeroed) rather than hardcoded in HTML or JS-scattered, so replacing them later is a
  one-line edit per stat, not a rebuild. **Flagging explicitly: this section should not ship to
  production showing literal zeros as "our impact" — that actively undermines the trust design.md
  §1 is built around. It needs real numbers from Dana before going live, not just before this
  specific gap is "resolved."**
  - No title was given for this section this round; §5.9's own text references Finorix's "Key
    metrics behind our success" framing as the pattern to mirror, but that's Finorix's own site
    copy, not Dana's — not copied verbatim. Original framing written instead ("Our Impact" / "The
    Numbers Behind Dana"). The four labels themselves *are* real (§5.9 names these four categories
    explicitly) — only the numeric values are placeholder.
  - Section uses a plain white background (not the `--color-bg-elevated` boxed-card treatment used
    for Feature Grid/Experts) with solid `--color-accent-primary` (blue, not gradient — gradient
    stays reserved for hero/numbered-process) numerals at `--text-display-xl` — §3 explicitly names
    "stat counters" as a legitimate use of that full display size, not just Hero H1.
  - Count-up easing is a JS `easeOutCubic` approximation of CSS `ease`, since count-up animates a
    JS-owned numeric value over time (`requestAnimationFrame`), not a CSS transition — there's no
    literal `ease` keyword to apply here, just an easing curve that reads the same way.
  - No reveal/hover cascade-collision risk: count-up mutates `textContent` via JS on every
    `requestAnimationFrame` tick, never touching a CSS `transition` property, so it can't collide
    with the shared `[data-reveal]` primitive's own transition the way a CSS hover-transform would
    (see the Feature Grid entry for what that collision looks like when it does happen).

- **Testimonial Carousel (site map item 11, spec §5.10) — nothing fabricated, unmistakably marked**
  — no real public customer testimonials exist on the live site. Per SKILL.md rule 4, no quote,
  name, or star rating is invented: fabricated testimonials are a materially larger trust problem
  for a fintech page than fabricated stats (a fake customer voice attributed to a fake person is a
  different order of deceptive than an empty stat), so this got more defensive treatment than the
  metrics section did:
  - Both placeholder slides use bracketed tokens (`[Customer Name]`, `[Role / City]`) instead of a
    plausible-looking invented name — a name like "Jane D., Dhaka" could pass as real; a bracketed
    token cannot.
  - Stars render **unfilled** (`--color-border-subtle`, not `--color-accent-primary`) since no real
    rating exists — showing 5 filled stars would itself be a fabricated specific claim. The blue
    fill is reserved (commented in testimonials.css) for whenever a real rating is added.
  - A visible on-card **"Sample content" tag** using `--color-warning` — this system's first real
    use of that token, and an apt one: this genuinely is a "do not ship as final" warning state.
    Unlike the Experts section's judgment call (photo-only grid needed no on-page disclaimer
    because it wasn't misleading as-is), a testimonial card *reads as* a real customer statement by
    default, so the extra visible flag is warranted here specifically.
  - Carousel mechanism (auto-advance, pause on hover/focus, manual dots, IntersectionObserver-
    triggered start) reuses `ai-advisor.js`'s fallback-carousel pattern verbatim rather than
    inventing a new one.
  - Slides stack via one shared CSS Grid cell (`grid-column`/`grid-row: 1` on every `.testimonials__card`)
    so the track's height always matches the tallest slide regardless of which is `opacity: 0` —
    chosen over absolute-positioning (used for ai-advisor's screenshots) because quote length
    varies here, whereas ai-advisor's screenshots share one fixed aspect-ratio.
  - **This must not ship with either placeholder slide live** — replace both with real customer
    testimonials (and remove the sample-tag) before launch.

- **Pricing page (site map item 12, spec §5.11) + Final CTA (§5.13) + FAQ (§5.12) — first real
  route, and two premises that didn't match reality** — this is the first page built as its own
  route (`/pricing/`) rather than a homepage section; two things this task assumed were already
  built, weren't, confirmed by listing `components/` before starting:
  - **No final-CTA banner existed anywhere** (not on the homepage, not as a component) despite
    being asked to "reuse the already-built" one. Built fresh at `components/final-cta/` — headline/
    body/CTA are original copy grounded in already-established real facts (the "Get Dana AI" label
    used consistently in nav/hero; the cashflow-score mechanic from problem-solution), not new
    invented claims, and not the App Store/Google Play copy site map item 14 originally describes
    (no store links have been confirmed as real anywhere in this project). Meant to be reused on the
    homepage too whenever that section is added there — it currently isn't wired into `index.html`.
  - The homepage itself has no final CTA yet either, so "same content as the homepage's final CTA"
    had nothing to actually match — this pricing page's final-cta is the first instance, not a copy
    of an existing one.
  - **Check-icon color updated**: §5.11 previously said lime (`--color-surface-highlight`); this
    build's explicit instruction says `--color-accent-primary` (blue) instead — updated §5.11 to
    match. Reasonable given lime is elsewhere confined to badges/chips/small callouts, and blue is
    already the established icon color for feature-style content (feature grid).
  - **Featured-tier border uses solid `--color-accent-primary`, not `--color-border-glow`** — §5.11
    said "accent border" without specifying which; `--color-border-glow` is explicitly documented
    (§4, and the border-subtle §9 entry) as reserved for *interactive* hover/focus states, not
    static card definition, so using it for an always-on "this is the recommended tier" marker
    would contradict that existing rule. A solid, confident border is also just clearer for a
    static marker than a translucent 0.35-alpha ring designed to read as transient.
  - **No monthly/annual toggle** — no real annual rate has been published anywhere for either
    membership track, so none is fabricated. Ships monthly-only. **Flagging explicitly: if Dana
    wants an annual option, it needs a real confirmed rate before a toggle gets added — don't infer
    a discount percentage.**
  - **"Coming Soon" CTAs are native `disabled` buttons** (new `.btn:disabled` state added to the
    shared `styles/buttons.css`), not just visually styled to look inactive — genuinely
    non-interactive, so this never misrepresents an unavailable purchase as live, per explicit
    instruction. Only "Get Started Free" (both Basic tiers) is a real, clickable primary button.
  - **Centered pricing header is a named exception to §3's "never center-align body paragraphs
    longer than one line" rule** — flagged rather than silently overridden, since a centered
    pricing-page intro (H1 + subhead) is a near-universal, clearly intentional convention for this
    page type, not an oversight the way an accidentally-centered multi-line paragraph elsewhere
    would be.
  - **Reveal/static-transform split, a third variant of the same pattern**: `.pricing-tiers__item`
    (wrapper, owns the shared `[data-reveal]` scroll-reveal) wraps `.pricing-tiers__card` (owns the
    featured tier's static `translateY(-8px)` raise) — same reasoning as the feature grid's reveal/
    hover split, except here the second transform is a permanent per-variant style rather than a
    hover state. Any component needing scroll-reveal plus *any other* reason to touch `transform`
    on the same conceptual element should follow this two-element split.
  - **FAQ accordion bug caught before shipping**: the original draft used the HTML `hidden`
    attribute for collapsed answer panels, which forces `display: none` — panels can't smoothly
    animate `max-height` from a `display: none` state, so the very first open would have snapped
    instead of transitioning. Fixed by switching to `aria-hidden` + an `.is-open` class (the same
    pattern already used for the navbar's mobile-menu submenu accordion), keeping the panel in
    normal flow so `max-height` transitions correctly every time.
  - **FAQ's 4th trust-question topic added beyond the literal instruction**: this build named three
    placeholder trust topics (data privacy, credit/loan eligibility, security standard), but §5.12
    itself requires a fourth ("what does cashflow score mean") — added that one too rather than
    silently dropping a spec requirement the instruction's enumeration happened to omit.
  - **Drive-by fix**: `styles/buttons.css`'s `.btn` transition declarations used the literal
    `ease-out` keyword instead of `var(--ease-out)` — a leftover from before the motion-system
    update that changed `--ease-out`'s value to `ease`. Fixed while already in this file for the
    disabled-state addition.

- **Get The App (site map item 14) — real content, distinct from the generic Final CTA banner** —
  built as its own component (`components/get-the-app/`), not merged into `final-cta`, per explicit
  instruction that both exist. Real content used verbatim: "GET THE APP" headline, body copy, both
  store URLs. Placed directly before Final CTA in the homepage flow (`index.html`), which itself
  had never been wired into the homepage before now (only added to `/pricing` last pass) — both
  `get-the-app` and `final-cta` got added to `index.html` together this round.
  - **Visual**: `assets/Get-The_App-Screen.webp`, confirmed present by listing `assets/` first.
    Sampled pixel alpha to confirm it's self-framed exactly like `hero.gif` (transparent corners
    around an already-baked-in phone bezel, alpha 0 at all four corners, alpha 255 center) — so no
    separate CSS bezel is composited on top, same reasoning as the hero build.
  - **Reference image used for content/structure only** — the user-provided inspiration screenshot
    is dark teal-gradient themed (an old version of the site); only its stacked "GET"/"THE APP"
    headline layout, body copy pairing, paired store buttons, and phone-on-right arrangement were
    used. The actual background/button/text colors follow design.md's current light theme, not the
    screenshot's dark styling — consistent with every prior instruction in this project to treat
    dark reference screenshots as content-only inspiration.
  - **`--gradient-glow` extended to a third use** — §7 previously named exactly two places for the
    ambient glow (hero, CTA sections). This section is treated as a third, CTA-adjacent case (a
    download-conversion moment functioning like a hero-style device showcase) — flagging the
    extension rather than silently applying it. §7 should be read as "hero, CTA, and CTA-adjacent
    device-showcase sections," not literally capped at two.
  - **Button-weight resolution (SKILL.md rule 5)**: this section's two store buttons are styled
    solid `--color-primary` (this build's explicit instruction: "--color-primary fill for whichever
    button set is styled as primary in this section"). Since Get The App sits directly above the
    Final CTA banner and both could appear in the same viewport while scrolling between them, the
    Final CTA's own button was downgraded from a solid inverted-white fill to ghost/outline instead
    (`background: transparent; border: 1px solid var(--color-border-subtle); color: var(--on-primary)`)
    — so only one primary-weighted pairing appears per screen height. **Flagging a real, unresolved
    visibility concern**: `--color-border-subtle` is a black-based border (`rgba(0,0,0,0.08)`)
    calibrated for light backgrounds; against the Final CTA's dark-green banner it will read as
    close to invisible (this is the *same* underlying token already flagged elsewhere in this file
    for being faint even on white — here it's worse, black-on-dark-green rather than black-on-white).
    Implemented exactly as instructed rather than silently substituting a different color, but this
    should get real-browser verification, and likely wants a lighter, banner-specific border value
    if confirmed illegible.

- **Footer (site map item 15, spec §5.14) — a real pre-existing bug found and fixed, plus several
  documented gaps** — real content used verbatim: logo, social URLs, all four link columns,
  contact email, copyright.
  - **`assets/dana_logo.svg` was seriously broken and got fixed here** — it still carried the
    *original* dark-theme mint/violet gradient and a near-white (`#F5F7FA`) wordmark, both from
    before the light-theme migration many passes ago. Computed contrast: 1.07:1 against a white
    background — completely invisible. This is the same file the navbar has used unchanged this
    whole time, so the navbar logo has been silently broken since the light-theme migration and
    nobody caught it until building the footer required looking at the file directly. Fixed to the
    current `--gradient-brand` stops for the icon chip (white glyph on top, since the chip is now
    dark instead of light), black wordmark text, and Manrope instead of Inter. This fix applies
    everywhere the file is referenced, not just the footer.
  - **No social icon assets** (`linkedin.svg`/`fb.svg`/`yt.svg`, original or updated) exist anywhere
    in the project — hand-drawn as simple solid silhouette marks in one neutral color
    (`--color-text-secondary`, brightening to `--color-accent-primary` on hover), matching how every
    other icon in this build has been hand-drawn when no asset/library was available. Deliberately
    a different visual treatment from the site's own line-style UI icon family (§7) — social/brand
    marks are a distinct category (external identity marks), not a violation of "never mix icon
    families," which governs the site's own icon language specifically.
  - **Footer background**: `--color-bg-elevated` (`#F8F8F8`). Considered a darker neutral for more
    visual separation per this build's suggestion, but the documented palette has no third neutral
    between `bg-elevated` and a solid dark block like `--color-primary` — inventing one would
    violate "stay within the documented palette, don't introduce a new neutral," so `bg-elevated` is
    the only compliant choice available.
  - **No compliance/security badge assets exist anywhere** — §5.14 marks this row "if available";
    it isn't, so it's omitted rather than filled with fabricated badge icons. Not painted as an
    on-page apology (unlike a testimonial or an empty stat, an absent badges row doesn't read as
    broken or misleading on its own).
  - **Newsletter input is genuinely new UI, not wired to a real backend** — `footer.js` only calls
    `preventDefault()` on submit so it doesn't reload the page; it does not fake a "Subscribed!"
    success message, since nothing was actually subscribed. This is treated differently from
    pricing's "Coming Soon" buttons: a newsletter signup form built ahead of its backend is normal,
    unremarkable frontend work, not a misrepresented product feature the way a fake purchase button
    would be — so it isn't disabled or otherwise marked as inert, just quietly non-functional until
    a real service is wired up.
  - **Footer wired onto both pages that exist** (`index.html` and `/pricing/`) — footer, like the
    navbar, is global chrome, so it isn't limited to whichever page happened to need it first.

- **Real Dana logo swapped in (navbar + footer) — dark chip added, not a recolor** — the
  previous `assets/dana_logo.svg` was my own placeholder wordmark (built when no real asset
  existed, and separately patched once already for a stale-gradient contrast bug — see the earlier
  entry above). The user has now supplied Dana's actual official logo file, moved directly over the
  placeholder at the same path (`mv`, byte-for-byte, no re-transcription risk for its embedded
  base64 image data) so no HTML references needed to change.
  - **The real logo's wordmark is `fill="white"`** — authored for a dark background, confirmed by
    inspecting the SVG source directly. Placed raw on our light navbar/footer, the white letters
    would be invisible (the same failure mode as the placeholder bug, but this time it's the real
    brand asset, so recoloring it is not an option — that would mean editing Dana's actual logo,
    not fixing a stand-in). Resolved by giving `.navbar__logo`/`.footer__logo` a small dark chip
    background (`--color-primary`, an already-established token — no new color introduced):
    `padding: 8px 12px; background-color: var(--color-primary); border-radius: var(--radius-sm)`.
    This matches standard real-world practice for a single-background-color logo lockup dropped
    into a page whose theme doesn't match it.
  - Logo image height reduced from 32px to 24px in both places to keep the chip (24px + 16px
    vertical padding = 40px) comfortably inside the existing navbar bar heights (64px mobile /
    80px desktop) and the footer's normal flow, with clear breathing room on both.
  - Fixed both `<img>` elements' hardcoded `width`/`height` attributes from the placeholder's
    112×32 (aspect ~3.5) to the real file's actual viewBox, 120×45 (aspect ~2.67) — the old
    attributes would have caused a layout shift once the image loaded and CSS `width: auto`
    recalculated against the real aspect ratio.
  - Verified mobile fit: at the narrowest realistic viewport (320px), gutter + chip + hamburger
    gap totals ~160px against ~272px available — no horizontal overflow risk. Footer's brand block
    already stacks left-aligned on mobile with no layout dependency on the logo's exact size, so no
    separate mobile-specific override was needed for either placement.

- **Known low-contrast border: `--color-border-subtle` (`rgba(0,0,0,0.08)`) on `bg-base`** —
  flattens to ~1.2:1 against pure white, well under the 3:1 WCAG non-text-contrast guideline for
  UI boundaries. This affects the secondary/ghost button's resting-state border and any card border
  sitting directly on white. It's a verified token value (not something to unilaterally darken), and
  matches Finorix's own deliberately understated "ghost" aesthetic — mitigated by adding
  `--shadow-card` as a resting-state depth cue on the secondary button (§5.2), and by the fact that
  hover (`--color-border-glow`, blue) is far more visually distinct even though its own flattened
  contrast (~2.2:1) also sits under 3:1. Flagging rather than claiming this is fully resolved.

- **Navbar link spacing/alignment fix — real overflow zone, not a cosmetic nit.** User reported the
  desktop nav text feeling "too tight in a specific area." Measured it instead of guessing:
  logo chip (~88px) + 32px gap + 6 links/About (text widths ~527px + 6×32px gaps = ~719px) + 32px
  gap + CTA (~154px) needs **~1025px** of content width, but the previous 810px tablet breakpoint
  (`--breakpoint-tablet`, design.md §4) only leaves ~683px of inner width at 811px viewport (content
  max-width 1280 minus 2×64px desktop gutters, at that viewport). That's a genuine ~340px shortfall
  across the whole 811–~1010px range — links were actively cramped/near-overlapping there, not just
  perceptually tight. Fixed two things in `components/navbar/navbar.css` + `navbar.js`:
  1. Moved the navbar's own hamburger-collapse threshold from the 810px tablet tier to the 1200px
     `--breakpoint-desktop` tier (documented in §4 since the Finorix export but unused until now).
     At 1201px the same content needs ~1025px against ~1073px available — a real ~48px margin
     instead of a deficit. The 810px tier still governs the unrelated bar-height/padding shrink
     (`.navbar__container`'s 80px→64px height), since that's a small-screen compactness concern,
     not the link-count overflow issue.
  2. `.navbar__nav` now centers `.navbar__links` in the space between the logo and the CTA
     (`display:flex; justify-content:center`) instead of left-packing them flush against the logo
     with a large empty gap before the CTA — the previous asymmetric distribution read as "tight in
     one area" even before the hard overflow kicked in. Added `white-space: nowrap` on
     `.navbar__links` as a safety net against ugly mid-word wraps.
  Considered also widening the link-to-link gap from `--space-4` (32px) to `--space-5` (40px) for
  extra breathing room, but the same arithmetic showed that would only leave ~1px of margin right at
  the new 1200px boundary (given the width estimate's own ±10-15% uncertainty) — reverted to keep
  `--space-4`, since trading a fixed overflow bug for a new borderline one at a different width isn't
  a net improvement. `navbar.js`'s `matchMedia` listener (auto-closing the mobile menu on resize) was
  updated to `1200px` to match. Not yet verified in a real browser (no browser tool available this
  session) — verify visually once possible, particularly the 1010–1200px zone.

- **Locked standing rule: three-breakpoint verification on every future change** (mobile <810px,
  tablet 810–1200px, desktop >1200px) — checking layout overflow, text clipping/illegibility, mobile
  touch-target size, image/mockup reflow, hover-only interactions having a tap equivalent, and
  sticky/fixed elements not overlapping content. No browser tool is available this session, so this
  is done via static reasoning: reading each component's own media queries and computing real
  element/text widths against available container width at each tier boundary (the method used for
  the navbar fix above), not eyeballing the code. User made this mandatory after the navbar fix above
  turned out to be a real, quantified overflow rather than a style nit, and required a full
  retroactive audit of every section built so far. Findings from that audit, organized by area:

  **Navbar / hero / trust-bar / problem-solution / ai-advisor / feature-grid:**
  - **Sitewide: missing `scroll-padding-top` — anchor links land behind the sticky navbar.** No
    section anywhere set `scroll-margin-top`/`scroll-padding-top`, so jumping to `#features`,
    `#how-it-works`, `#rewards`, `#get-dana-ai`, etc. put the target's top edge exactly at the
    viewport top — directly behind the opaque/glass sticky navbar (80px desktop, 64px mobile),
    clipping the section heading on every anchor jump, at every width. Fixed by adding
    `scroll-padding-top` to `html` in both `index.html` and `pricing/index.html`'s inline styles,
    sized to navbar height + a small buffer (`calc(var(--space-10) + var(--space-1))` desktop,
    `calc(var(--space-8) + var(--space-1))` mobile via the existing 810px tier).
  - **Trust Bar + Feature Grid: no tablet tier, only mobile.** Both jumped straight from a 4-column
    grid to a mobile-only 1-2 col collapse at 810px, with nothing in between. Measured: at 811px each
    4-col card had only ~105px of text width, wrapping Feature Grid's longer descriptions into ~10
    cramped lines per card (worse than even the desktop column, ~202px). Fixed by adding a
    `@media (max-width: 1200px)` tier to both (`trust-bar.css`, `feature-grid.css`) dropping to
    2 columns — giving each card ~280px, roomier than desktop. Mobile's own further collapse (2→2
    unchanged for trust-bar, 2→1 for feature-grid) still happens at 810px as before.
  - **AI Advisor: carousel dots were an 8×8px touch target.** `.ai-advisor__dot` drew its 8px visual
    size directly on the clickable `<button>` — on touch devices (where these dots are the manual
    screen-jump control for the mobile auto-cycle fallback, not just a desktop decoration) an 8px hit
    area is far below usable. Fixed by growing the button to 40×40 (matching the navbar hamburger's
    established precedent) with the visible 8px dot drawn via `::before`, keeping the exact same
    visual size while the tappable area grows.
  - **Hero: headline may wrap in the ~811–950px zone.** `--text-display-xl` (52px) applied to a
    pre-broken 3-line headline (`display:block` spans, e.g. "Financial AI") could exceed a ~330px
    tablet-width content column by a rough margin (estimated ~340px needed vs ~330px available) —
    but since the spans have no `white-space:nowrap`, this degrades to a graceful 2-line wrap, not
    clipping or overflow. Left as-is: not a violation of the checklist's actual failure modes (no
    clip/overlap/illegibility), just a soft typographic ideal not hit at one narrow zone.
  - **Checked clean, no changes**: navbar (re-verified after the fix above — collapses cleanly at
    1200px, no overflow at any tier); hero's dual-CTA wrap behavior (`flex-wrap: wrap` handles tight
    tablet widths); hero-visual-chatbubble Option B (no breakpoints needed, scales via `max-width`
    inside its parent at every tier); problem-solution (single narrow text column, no grid risk at
    any width); ai-advisor's pinned-scroll-scrub (JS's `DESKTOP_BREAKPOINT` (810) matches the CSS
    breakpoint that switches the layout to side-by-side, so scrub mode and the layout it depends on
    never activate independently of each other); feature-grid's hover-lift (decorative only, gates no
    content or functionality, so a missing tap-equivalent isn't a functional gap).

  **How it works / rewards / experts / metrics / testimonials:** two real issues found and fixed
  (same measure-don't-guess method used for the navbar):
  - **Experts grid (`components/experts/experts.css`)**: the 6-column desktop grid had no tablet
    tier, dropping straight to 2 columns only below 810px. Measured: at 811px viewport, 6 columns
    computes to (683px inner - 5×24px gaps) / 6 = **93.8px per headshot** — too cramped for a face
    photo. Added a `@media (max-width: 1200px)` tier stepping down to 3 columns (~212-341px cards
    across the whole tablet range), same "narrow zone between two working states" pattern as the
    navbar bug. Also added `.experts__card:active` alongside `:hover` for the card-lift effect
    (`translateY(-4px)` + shadow) — the hover-only version had no tap equivalent, so touch users
    never saw it at all, per this rule's explicit hover-vs-touch check.
  - **Testimonial carousel dots (`components/testimonials/testimonials.css`)**: dots were literally
    8×8px clickable buttons — well under any usable touch-target size (WCAG 2.5.8 wants ≥24px).
    Fixed via the same enlarged-invisible-hitbox-around-small-visual technique already used by the
    navbar hamburger (40×40 button around thin spans): dots are now 32×32px tappable buttons with
    an 8px visual dot centered via `::after`, so the on-screen look is unchanged but the tap target
    is now WCAG-compliant.
  - Audited and found clean (no changes needed): How It Works (phone-bezel mock + numbered-step
    connecting line reflow correctly at all three tiers; single 810px breakpoint is sufficient since
    the 3-column step row doesn't get tight enough at any tablet width to need its own tier), Rewards
    (12-col grid holds up down to ~152px illustration cards at 811px — small but square icons/labels,
    not text, so not an illegibility risk), Metrics (4→2 column grid; current placeholder "0+"/"0★"
    values are short enough not to overflow at any width — flagging as a latent risk to re-check once
    real figures replace the placeholders, since a real 6-7 digit number at `--text-display-xl` could
    behave differently in a 152px-wide tablet column).

  **Pricing / FAQ / get the app / final CTA / footer:** two real issues found and fixed; three areas
  audited clean:
  - **Pricing tier grid (`components/pricing/pricing.css`)**: `.pricing-tiers__grid` was 3 columns
    unconditionally until the 810px stack — same "no tablet tier" shape as the experts-grid bug.
    Measured: 212px/card at 811px vs. 341px/card at 1200px, a real squeeze relative to desktop.
    Added a `@media (max-width: 1200px)` tier stepping down to 2 columns (3rd card in each group of
    3 wraps to its own row — an acceptable "2+1" tablet layout, same pattern as the navbar/experts
    fixes). Coming Soon disabled buttons and all CTAs inherit `.btn`'s ~48px height (16px padding +
    16px line-height) regardless of card width — touch targets were never actually at risk here,
    only visual cramping was.
  - **Footer link grid (`components/footer/footer.css`)**: the top-level `footer__top` 2-column
    split (brand | links, `minmax(240px,1fr) 2fr`) leaves the inner 4-column `.footer__links` grid
    only ~371px to work with in the 811-1200px tablet range — computed to **~75px per column** at
    811px (a link like "Terms & Conditions" needs ~160px on one line). Added a
    `@media (max-width: 1200px)` tier dropping `.footer__links` to 2 columns (previously this
    override only existed inside the `810px` mobile query, where it wasn't actually doing the
    tablet-range job); at 1200px that gives ~149px/2-col vs. the previous ~75px/4-col. Also bumped
    `.footer__social-link` from 36×36px to 40×40px (`var(--space-5)`, an existing token — no new
    value introduced) since 36px sits under the ~40-44px touch-target comfort floor.
  - Audited and found clean: **FAQ accordion** (longest real/placeholder answer is ~140 characters;
    even at a 320px mobile viewport that wraps to ~4 lines (~112px), nowhere near the 300px
    `max-height` ceiling — no clipping risk at any width; the plus-to-x icon and question text don't
    overlap at any width since the icon is a flex sibling, not absolutely positioned over the text).
    **Get The App** (12-col 6/6 split narrows to ~329px per side at 811px — tight but the store
    buttons already have `flex-wrap: wrap` as a graceful fallback if they don't fit side-by-side, and
    the screenshot's own 320px `max-width` cap is already narrower than the tightest column, so nothing
    new is needed). **Final CTA banner** (single centered column, no grid to break at any width — the
    already-flagged ghost-button-border-visibility-on-dark-background issue is unrelated to
    breakpoints and intentionally left as-is, not re-litigated here). No hover-only interactions
    without a tap equivalent were found in this batch (button hover glow/scale is decorative, not
    load-bearing for the tap to work).

- **Scaffolded into a real Next.js 16 (App Router, React 19, TypeScript) project — structural
  reorganization only, no redesign.** Every component/page's visual and behavioral content was
  ported as-is from the fetch-injected static HTML/CSS/JS build; the old build is fully preserved
  at `legacy-static-site/` (components, both old pages, shared `styles/`, and the original
  `assets/` folder — `public/assets/` is now the single canonical copy served by the app, moved
  there via `cp` then the original relocated to the archive, not deleted).
  - **A real accident happened and was recovered, not silently absorbed**: this Mac's filesystem
    is case-insensitive, so `components/Navbar` and `components/navbar` are literally the same
    directory entry. An `rm -rf components/Navbar` (cleaning up a failed capitalized-folder
    attempt) silently deleted the pre-existing lowercase `components/navbar/` — the real
    navbar.html/css/js, including this session's breakpoint fixes. Recovered by reconstructing
    all three files byte-for-byte from content still present earlier in the same conversation
    (they'd just been read in full moments before). No data was actually lost, but there was no
    git repo as a safety net, and it could have been unrecoverable — flagging plainly rather than
    treating it as routine. Lesson applied for the rest of the migration: never `rm -rf`/`mkdir` a
    `components/` path whose name differs only in case from an existing sibling; the old lowercase
    tree was moved to the separate `legacy-static-site/` parent path *before* building the new
    PascalCase tree, so the two casings never coexisted as siblings again.
  - **Project structure**: `/app` (App Router routes), `/app/globals.css` (every design.md token
    as CSS custom properties on `:root`, byte-identical values to the old `styles/tokens.css`,
    plus the shared `.btn`/`.pill-badge`/`[data-reveal]` utility classes — these were global CSS
    files before and are global now, just relocated), `/components/<PascalName>/<PascalName>.tsx`
    + `.css` (one folder per section — Navbar, Hero, TrustBar, ProblemSolution, AIAdvisor,
    FeatureGrid, HowItWorks, Rewards, ExpertsGrid, MetricsStats, Testimonials, PricingTiers,
    FAQAccordion, GetTheApp, FinalCTA, Footer — 16 total), `/components/shared/` for
    cross-cutting pieces (`ScrollRevealInit.tsx`, the new `ComingSoon.tsx`), `/public/assets/`.
    Component CSS is plain CSS imported directly into its `.tsx` file (`import "./X.css"`), not
    CSS Modules — matches "no CSS-in-JS framework unless one's already in use," since the classes
    were already BEM-namespaced (`.navbar__...`, `.hero__...`) with no collision risk.
  - **Server vs. client components**: only the 5 components that had a real `.js` file in the old
    build became `"use client"` components — Navbar (scroll/dropdown/mobile-menu), Footer
    (newsletter preventDefault), AIAdvisor (pinned-scroll-scrub + fallback carousel), MetricsStats
    (count-up), FAQAccordion (accordion state), Testimonials (carousel). The other 10 content
    components have no interactivity beyond CSS `:hover`/`:active` and ship as plain Server
    Components — a real, if incidental, improvement (less client JS shipped) rather than a design
    change, since nothing about their markup or styling changed.
  - **Shared scroll-reveal primitive re-homed, not reinvented**: the old `styles/scroll-reveal.js`
    (one global IntersectionObserver over every `[data-reveal]` element, load-once) became
    `components/shared/ScrollRevealInit.tsx`, mounted once in `app/layout.tsx`. Because the root
    layout persists across client-side navigation in the App Router (a plain mount-only effect
    would only ever see the first page's elements), it re-scans on `usePathname()` change so
    every route's `[data-reveal]` elements still get observed, not just whichever page loaded
    first.
  - **`next/image` used for every real image/screenshot** (never a plain `<img>` — verified zero
    matches for `<img` across all component files), with real pixel dimensions checked via `sips`/
    PIL rather than guessed, to avoid layout shift. `hero.gif` is explicitly `unoptimized` to
    guarantee Next's image pipeline doesn't collapse the animation to a static frame. Screenshots
    that were absolute-positioned + `object-fit: cover` in the old CSS (AI Advisor, How It Works)
    use `<Image fill>` with a `sizes` prop, matching the exact same visual result. Inline
    hand-drawn SVG icons (the site's own line-icon family, social silhouettes, check-icons,
    accordion plus/x) stay as inline JSX SVG, unchanged — they were never real image files.
  - **Asset paths unchanged**: `/assets/dana_logo.svg` etc. still resolve to the same URL, since
    Next's `public/` folder root-maps — no reference rewriting was needed anywhere, only moving
    the source folder.
  - **Necessary adaptations, not design changes** (both components were previously homepage-only
    markup and are now global/shared across routes): (1) Navbar's same-page anchor links
    (`#features`, `#how-it-works`, `#rewards`, `#get-dana-ai`) became `/#features` etc. so they
    resolve correctly when clicked from `/pricing`, `/team`, or `/lab`, not just when already on
    the homepage — same for the homepage's own `#get-dana-ai` CTA hrefs, which are now `/#get-dana-ai`
    for the same reason. (2) FinalCTA was already documented as reused chrome (homepage + pricing)
    and is now literally one component imported by both `app/page.tsx` and `app/pricing/page.tsx`,
    not duplicated markup, per SKILL.md rule 3.
  - **Hero ships "Option A" only (the real `hero.gif`)** — the old `index.html` had a demo-only
    A/B toggle against a chat-bubble mock, explicitly commented "not part of the shipped
    component." That toggle harness was intentionally not ported; Option A was always the shipped
    default. `hero-visual-chatbubble.html/css` (Option B) remain in `legacy-static-site/` as
    historical reference, not part of the production component tree.
  - **`/team` and `/lab` ship as honest placeholder pages, not fabricated content** — the
    instruction asked for both as real routes, but no bios, roles, or Lab feature copy exist
    anywhere in this project (same situation already documented for the Experts section, which
    is deliberately photo-only for the same reason). Rather than invent team member names or
    product copy for a page with zero real source material, both routes render a small new
    `components/shared/ComingSoon.tsx` (reused, not duplicated, per SKILL.md rule 3) that states
    plainly there's nothing to publish yet, with a link home. **`/blog`, `/career`, `/media` were
    NOT scaffolded as routes** — per the literal instruction ("stub routes... if they've been
    started") they haven't been started anywhere in the project (no HTML/content ever existed for
    them), so leaving them unrouted preserves the exact same behavior as the old static site
    (those links already 404'd there too, since no `/blog/index.html` etc. ever existed) rather
    than making something up just to avoid a 404. Flagging this explicitly rather than silently
    building three more placeholder pages beyond what was asked, or silently skipping the ask.
  - **Verification performed** (not just "it compiles"): `npx tsc --noEmit` clean across the whole
    tree; `npx next build` succeeds, all 5 routes (`/`, `/pricing`, `/team`, `/lab`, plus the
    built-in 404) prerender as static content; `next start` + `curl` against every route returns
    200 (404 for a genuinely nonexistent route, confirming routing works correctly either way);
    rendered HTML spot-checked for stray "error"/"undefined" text (the only matches found were
    normal React Server Components serialization internals — `"$undefined"` markers and the
    built-in not-found page's shared CSS class name — not real errors); every real asset path
    (`dana_logo.svg`, `hero.gif`, an expert headshot, the Get-The-App screenshot, a how-it-works
    screenshot) returns 200 from `public/assets/`; every real external link (both app store URLs,
    all three social URLs, the mailto) grepped and confirmed present verbatim in the new
    components; zero `href="#"` fallbacks anywhere in the new tree. All CSS files confirmed
    brace-balanced after the multi-fork conversion. This session's breakpoint-audit fixes
    (navbar's 1200px collapse, trust-bar/feature-grid/experts/pricing-tiers/footer's 1200px
    tablet tiers, testimonials' 32px dot hitbox, footer's 40px social icons, experts' `:active`
    tap-equivalent, the sitewide `scroll-padding-top`) were all spot-checked present, unchanged,
    in the new component CSS/globals.css — the migration did not regress any of them.
  - **Not re-verified visually**: no browser tool is available this session (same constraint as
    every prior breakpoint check), so "verified" above means build/runtime/content-integrity
    checks, not a pixel-level visual comparison against the old static build. Recommend an actual
    browser pass (`npm run dev`, then load `/`, `/pricing`, `/team`, `/lab` at mobile/tablet/
    desktop widths) before treating this as fully shipped.
  - **Left untouched at the project root, not part of this migration's scope**: a stray duplicate
    `hero.gif` (byte-identical to the one in `assets/`), an empty `sec2-screens/` folder, and
    `color palette.png` (an early reference image, never referenced by any component) all predate
    this session and weren't moved or deleted — reorganizing files outside the explicit "scaffold
    into Next.js" ask wasn't requested.

- **Hero background/palette override, matching Finorix's hero atmosphere — a deliberate, scoped
  exception to the light-theme system, not a site-wide change.** User supplied a real dark-green
  gradient/grid image (now `public/assets/hero-bg-gradient.webp`, converted from the supplied PNG,
  445KB → 17KB, no visible quality loss) and asked for it as the Hero's background, with text
  colors and CTA styling adjusted to suit, and the headline treatment brought closer to Finorix's
  reference hero. A live fetch of `https://finorix.framer.website/` was attempted for exact
  headline styling specifics, but returned only generic, hedged text (Framer sites render via JS,
  so a text-only fetch misses real visual detail) — confirmed just the eyebrow → headline → dual-CTA
  structure Dana's hero already follows (§1's "Reference DNA"), nothing more specific with real
  confidence. Given that, this change is scoped to color/background treatment only, not a layout
  rebuild: the existing two-column (text left, real-screenshot-in-device-frame right) structure is
  preserved, since §1 explicitly lists real screenshots in context as a Dana strength to keep, and
  restructuring to a single centered column wasn't explicitly requested — flagging this choice so
  it can be redirected if a full layout match was actually wanted.
  - Every element inside the Hero that assumed the sitewide white background needed a light-on-dark
    counterpart, each verified by actual contrast sampling against the image (not assumed): the
    eyebrow badge (`.hero__badge` override: white-based translucent fill/border + `--on-primary`
    text, sampled ~11:1), the two outer headline lines (`--color-text-secondary` → `--on-primary`,
    same ~11:1), the emphasis line (`--gradient-brand` text-fill → solid `--color-surface-highlight`
    lime, sampled ~7.7:1 — also the "greenery" treatment asked for, using an existing token rather
    than inventing a new color), and both CTA buttons.
  - **CTA buttons got real, working fixes here** (not the same flagged-but-shipped-broken treatment
    Final CTA got): the default `.btn--primary` is dark-green-on-white-text, which would nearly
    disappear against this section's own now-dark-green background — same failure mode already
    documented for Final CTA's ghost button, but resolved properly this time since Hero is being
    actively rebuilt: `.hero__cta-primary` uses a lime fill + `--color-text-primary` (an existing
    sanctioned pairing, §2, 14.7:1) instead. `.hero__cta-secondary` swaps the ghost button's
    black-based border/text for a white-based translucent border + white text. Both are scoped
    overrides local to Hero.css (`className="btn hero__cta-primary"`, not `btn--primary`), the same
    override pattern already established for Final CTA's `.final-cta__cta`.
  - **`--gradient-glow` (blue radial) removed from this section only** — the new background image
    already has its own bright green ambient glow baked in low in the frame; keeping the separate
    blue radial behind the device visual would visually fight it rather than add atmosphere.
    `--gradient-glow` is untouched everywhere else it's used (Final CTA, Get The App) — this is a
    Hero-specific removal, not a token deprecation.
  - No new colors were introduced — every swap reuses an existing token (`--on-primary`,
    `--color-surface-highlight`, `--color-text-primary`) already defined for exactly this kind of
    light-on-dark or dark-on-lime pairing elsewhere in the system.
  - Not verified in a real browser (no browser tool this session) — confirmed via `next build`/
    `tsc --noEmit` (both clean) and the actual RGB-sampling contrast math above, not a visual pass.

- **Navbar "on dark hero" state — a real, measured contrast bug introduced by the Hero background
  change above, not a cosmetic follow-up.** Sampled: the navbar's default dark-green link color and
  dark-green CTA fill both compute to ~1.15:1 contrast against the new hero background — effectively
  invisible. This only affects the homepage (the only route with a `#hero` element) and only while
  the navbar still overlaps it; `/pricing`, `/team`, `/lab` start on the plain white page background
  and were already unaffected, confirmed by checking each route has no `#hero` element.
  - **Mechanism**: `Navbar.tsx` runs an `IntersectionObserver` on `document.getElementById('hero')`
    with `rootMargin: "-80px 0px 0px 0px"` (matching the desktop navbar's own height, `--space-10`)
    — `entry.isIntersecting` stays true exactly as long as the hero extends past the navbar's own
    bottom edge, flipping false the instant it doesn't, regardless of exact scroll position. This
    is geometry-driven, not a hardcoded pixel/scroll-position guess, so it stays correct at any
    viewport height without separate breakpoint-specific thresholds. Chosen over manually computing
    `scrollY` against the hero's measured height because it's simpler and doesn't need a resize
    listener to stay correct if the hero's height ever changes (e.g. copy edits, image swap).
    Re-runs on `usePathname()` change for the same reason `ScrollRevealInit` does — the root layout
    persists across client-side navigation, so a mount-only effect would only ever check whichever
    page loaded first.
  - **One accepted imprecision**: the `-80px` rootMargin matches the desktop bar height; the mobile
    bar is shorter (64px, `--space-8`), so on mobile the "on dark" state can flip off up to 16px
    earlier than the exact overlap boundary. Not worth a resize-observer-driven remeasurement for a
    16px, visually imperceptible margin.
  - **Three states, not two**: transparent-on-dark (top of homepage, over hero, `<40px` scrolled),
    glass-on-dark (`.navbar--on-dark.is-scrolled` — still over the hero but past the existing 40px
    glass threshold; the default glass fill is a black-based 4% tint, which blurred over a
    dark-green image still reads as dark green, so this state gets its own white-based 8% tint so
    the "frosted glass" effect actually looks frosted), and the original glass-on-light (scrolled
    past the hero entirely, or any other route — completely unchanged from before this fix).
  - **Colors changed while `.navbar--on-dark` is active**: nav links → `rgba(255,255,255,0.85)`
    (hover → `--on-primary`), chevron → `rgba(255,255,255,0.55)`, hamburger bars → `--on-primary`,
    and the CTA button gets the exact same lime-fill + dark-text treatment as Hero's own
    `.hero__cta-primary` (visual continuity between navbar and hero, both now share one CTA
    language against this background) instead of the default dark-green fill that would have the
    same ~1.15:1 problem. No new colors introduced — every value is either an existing token or a
    translucency of `--on-primary`/white already used elsewhere in this file (the mobile-menu glass
    overlay already uses a similar `color-mix`-based white translucency).
  - **Untouched, confirmed still correct**: the logo (its own dark-green chip has a solid fill
    regardless of what's behind it — no change needed, verified by re-reading `.navbar__logo`), the
    About dropdown panel and mobile full-screen menu (both are their own opaque/blurred surfaces
    once open, self-contained regardless of what's behind the navbar bar itself).
  - **One accepted trade-off, not fixable without added complexity**: `isOverHero` starts `false`
    on server-render and only flips true after the `IntersectionObserver` runs post-hydration, so
    there's a brief first-paint flash of the default (wrong-for-hero) colors before JS takes over —
    the same category of client-only-computed-state limitation the pre-existing `isScrolled` state
    already had, not a new regression introduced by this fix.
  - Not verified in a real browser (no browser tool this session) — confirmed via `tsc --noEmit`
    (clean), route-level `curl` checks (all still 200), and the contrast math above; a visual pass
    is recommended before treating this as fully verified.

- **Hero composition fix: background felt "flat/dead" and the device visual read as cut off on
  shorter viewports.** Two real, measured causes, not vague polish:
  - **Background anchoring**: the supplied image is 2000×1533 (a 1.3:1 landscape) with its bright
    glow concentrated low in the frame, but `background-position: center` placed that glow wherever
    it happened to fall within the hero's own (often much taller) rendered box — usually somewhere
    in the middle-to-lower area, leaving the visible upper portion (where the badge/headline/CTA
    actually sit) looking like flat, dark, uneventful green. Changed to `background-position: center
    bottom`, which pins the image's own bottom edge — and its glow — to the section's bottom edge
    at every viewport height, so the "alive" part of the image is always where it's supposed to be
    rather than floating unpredictably.
  - **Device visual had no height cap**: `hero.gif` is a genuinely tall 500×1021 capture (~0.49:1);
    at `max-width: 360px` alone it always renders ~735px tall regardless of viewport height. On a
    typical laptop browser window (often under 800px of visible height once chrome/toolbars are
    subtracted), that pushes the bottom of the phone past the fold before any scrolling — not an
    actual CSS clipping bug, but indistinguishable from one at first glance, which is what "half
    cut in the bottom" was describing. Fixed by adding `max-height: min(640px, 65vh)` alongside the
    existing `max-width: 360px` — browsers shrink width in tandem with height when both constrain a
    replaced element (standard aspect-ratio-preserving sizing, not a hack), so the whole device now
    scales down to fit comfortably within the visible hero at any viewport height, short or tall,
    rather than always claiming a fixed 735px regardless of the window it's in.
  - No new tokens/colors introduced; both fixes are pure layout/positioning math, verifiable
    without a browser (image's real pixel dimensions confirmed via PIL, not assumed). Not verified
    visually (no browser tool this session) — recommend a real-browser pass across a genuinely
    short viewport (e.g. a 13" laptop at ~700-750px visible height) to confirm the intended feel.

- **Navbar "on dark hero" state, refined per explicit follow-up feedback**: the first pass (two
  entries above) gave the glass-scrolled state its own white-based translucent tint while over the
  hero, reasoning that the default black-based tint still read as dark green once blurred. The user
  correctly rejected this too — any visible fill between the navbar and the hero image was unwanted;
  the ask was for the navbar to stay **fully transparent** for the entire time it overlaps the hero,
  regardless of scroll position, with the existing glass system resuming automatically and only once
  the navbar has genuinely cleared the hero. Fixed: `.navbar--on-dark.is-scrolled` now sets
  `background-color: transparent; backdrop-filter: none; border-bottom-color: transparent` —
  neutralizing the glass effect entirely while on-dark, rather than giving it an alternate tint. No
  new logic was needed for the "automatically resume normal behavior after the hero" half of the
  ask — that already happens for free, since `.navbar--on-dark` is removed the instant the
  `IntersectionObserver` (Navbar.tsx) reports the hero has scrolled out from under the navbar, at
  which point the plain `.is-scrolled` rule (unchanged, untouched) takes over exactly as it always
  has for every other page and section.
  - **Logo chip removed while on-dark**: the dark-green chip behind the logo (`.navbar__logo`,
    added earlier specifically because the real brand logo's wordmark is white and needs a dark
    backdrop to read on the light page) becomes counterproductive once the navbar sits over the
    hero's own dark-green background — a dark-green box on a dark-green image reads as a stray
    patch, not a clean mark. `.navbar--on-dark .navbar__logo` sets `background-color: transparent`
    only, leaving padding/border-radius untouched so the logo's position and footprint don't shift
    the instant the class toggles at the hero boundary — only the fill disappears, letting the
    logo's own white wordmark and lime icon (unchanged, no SVG edits) sit directly on the hero
    image, which is exactly where its native colors already work (~11:1, same white-on-hero
    contrast sampled for the headline and nav links). The chip itself is untouched everywhere else
    — every other page, and the homepage once scrolled past the hero, keep the original dark chip,
    since that's still the correct treatment against the light page background there.
  - Net effect: while over the hero, the navbar is now genuinely transparent end-to-end (no fill,
    no blur, no chip) at every scroll position within it, with only the light-colored
    links/chevron/hamburger/CTA (already established in the prior entry) providing contrast against
    the hero image directly — matching the explicit ask that "the navbar and other things should be
    white or something that properly readable" with nothing else added on top.
  - Not verified in a real browser (no browser tool this session) — confirmed via `tsc --noEmit`
    (clean) and route-level `curl` checks (all still 200); a visual scroll-through of the homepage
    is recommended to confirm the transition feels seamless at the exact hero boundary.

- **Navbar "on dark hero" — hardened after the user reported the previous fix still wasn't taking
  effect.** Investigated by pulling the actual *compiled/served* CSS (not just the source file) via
  `curl` against the dev server's chunk output, after a full clean restart (`rm -rf .next`, kill and
  relaunch `next dev`) to rule out stale Turbopack HMR state from many rapid successive edits to
  this file. Confirmed: the source logic, selector specificity, and rule ordering were all already
  correct in the compiled output (`.navbar--on-dark.is-scrolled` does come after `.navbar.is-
  scrolled`, same specificity, later rule should win by cascade order) — so the most likely
  explanation is a stale HMR/browser-cache state on the previous attempt, not a logic bug.
  Regardless, hardened both overrides with `!important` so they can never lose a same-specificity
  tie against `.navbar.is-scrolled` / the default `.navbar__logo` chip, regardless of how a bundler
  happens to order separate per-component CSS files at build time — this project splits CSS one
  file per component (by design, matching "no CSS-in-JS, plain CSS"), so same-specificity source-
  order assumptions across *different* files are inherently more fragile than they'd be in one
  hand-ordered stylesheet. `!important` is used narrowly here (two rules only, both are "this state
  must always win when active" overrides, not general styling) rather than as a broad habit.
  - Also noticed in the compiled CSS: the standard `backdrop-filter` property was absent from the
    output entirely (only `-webkit-backdrop-filter` survived) for both `.navbar.is-scrolled` and
    the new override — the source has always declared `backdrop-filter` before `-webkit-backdrop-
    filter`, and Lightning CSS (Turbopack's CSS transform) appears to collapse the pair down to
    just the vendor-prefixed form when written in that order. Convention is to write the prefixed
    version *first*, standard *last*, so the standard property should win when both are supported —
    worth fixing (swap the order in the base `.navbar.is-scrolled` rule) in a future pass since it
    means the blur may not be applying via the standard property path in browsers that don't treat
    `-webkit-backdrop-filter` as an alias; not fixed in this pass since it's a pre-existing
    peculiarity unrelated to what was reported, flagging rather than scope-creeping into it here.

- **The actual root cause of the "white navbar over the hero" report, found from a user-supplied
  screenshot: `position: sticky` was the bug, not any color/cascade logic.** Every prior pass in
  this thread (the on-dark color treatment, the glass-fill override, the `!important` hardening)
  was solving a real problem, but the wrong one — none of it could have fixed what the screenshot
  showed, because the screenshot was taken at scroll position 0 (page just loaded, unscrolled).
  `.navbar` was `position: sticky`, which still reserves its own 80px/64px box in normal document
  flow at the very top of `<body>` — the Hero section is a separate, later element in the DOM,
  starting immediately *after* that reserved box, not underneath/behind it. So at scroll 0, a
  "transparent" navbar has nothing to show through to except the plain white `<body>` background
  (`--color-bg-base`) — the Hero's dark-green image doesn't even begin until y=80 (right where the
  navbar's box ends), so there was nothing for the on-dark logic to reveal yet. The on-dark/glass
  fixes were all correctly scoped to *scrolled* states, where sticky positioning does start
  overlapping content beneath it — but the unscrolled top-of-page state (what the screenshot
  showed) was never touched by any of them, because sticky doesn't create that overlap until the
  user actually scrolls.
  - **Fix**: `.navbar` changed from `position: sticky; top: 0;` to `position: fixed; top: 0; left:
    0; right: 0;`. This removes the navbar from document flow entirely, so it floats over whatever
    is at the very top of the page from the first pixel, on every route — exactly the "header
    overlaying a full-bleed hero" pattern this design needs. Verified in the actual compiled CSS
    served by the dev server (not just the source file) that `position: fixed` landed correctly.
  - **No page needed compensating top padding.** The standard concern with switching a
    flow-reserving navbar to a flow-removing one is that content immediately below it will now be
    hidden under the fixed bar. Checked every page's first section instead of assuming: Hero,
    PricingTiers, and ComingSoon (`/team`, `/lab`) already use the same 120px desktop / 72px mobile
    top padding — design.md §4's standard section vertical rhythm, applied for unrelated reasons
    long before this fix — which already exceeds the navbar's own 80px/64px height in every case
    (with a deliberately-noted-elsewhere 8px margin on mobile). So every page already had enough
    built-in clearance; nothing needed to change on the content side.
  - The IntersectionObserver-based on-dark detection (added two entries above) needed no changes
    either — it was already deriving `isOverHero` from each element's real, current
    viewport-relative geometry rather than a hardcoded assumption about document position, so it
    automatically remained correct once the Hero's actual document position shifted from y=80 to
    y=0 as a side effect of this fix (re-derived and confirmed the boundary math by hand rather than
    assuming).
  - Not verified in a real browser (no browser tool this session) — this fix was diagnosed directly
    from a user-supplied screenshot rather than my own visual inspection, which is a stronger signal
    than the purely-computed verification used elsewhere in this file; still recommend a live scroll
    check to confirm the transition at the hero boundary looks right end-to-end.

- **Attempted, then reverted: swapping the navbar logo to a user-supplied "black version" file past
  the hero.** Requested to replace the white-wordmark-on-a-dark-chip treatment (once past the hero)
  with a real black logo file at `legacy-static-site/assets/dana-black-version Background
  Removed.png`, removing the chip entirely for that state. Copied the file and wired up the swap,
  but checked its actual pixel content before shipping (per SKILL.md rule 4, "preserve real
  content," and the standing "never fabricate/ship unverified" discipline used throughout this
  file) — scanned every pixel and found **no dark/black pixels anywhere in the file** (darkest
  opaque pixel found was RGB(161,186,19), an olive-lime tone) and confirmed visually: the file
  contains only the lime icon mark, with no "Dana" wordmark at all. Likely cause: the original
  logo's wordmark is white (same file/limitation documented earlier in this section, "Real Dana
  logo swapped in"), and whatever background-removal tool produced this file probably treated the
  white wordmark as part of the white background and erased it along with it, leaving only the
  colored icon glyph.
  - Shipping this as the past-hero logo would have made the navbar show only a leaf icon with no
    "Dana" text on every page except the homepage's hero — a real regression, not the requested
    fix — so it was reverted rather than shipped. `public/assets/dana-logo-black.png` was removed;
    `Navbar.tsx`/`Navbar.css` are back to the exact white-wordmark-SVG + dark-chip (default) /
    transparent-chip (on-dark) treatment from the entry above, unchanged.
  - **Needs a corrected asset from Dana**: a real black-version lockup with both the icon *and* the
    wordmark rendered in a dark color, on a transparent background. Once supplied, the swap
    logic already exists in this session's history and can be reapplied directly (conditional
    `<Image>` src based on `isOverHero`, dropping the default chip since a genuinely dark wordmark
    doesn't need one against the white page).

- **Black-text logo resolved — by recoloring the real SVG's existing wordmark paths, not by
  waiting on a new asset.** Follow-up clarified the actual ask: not the icon-only PNG from the
  entry above, but the real `dana_logo.svg` wordmark with its own fill changed from white to
  black, keeping the lime icon exactly as-is, and no chip/backdrop in either state at all (fully
  transparent everywhere, all the time).
  - **How this differs from "fabricating a new asset"**: the real SVG's wordmark is vector path
    data (actual letterforms), not a rasterized image — changing which color fills those paths is
    a mechanical color-value edit to real, already-licensed artwork, the same category of edit as
    every other token-driven recolor in this file, not inventing new shapes or letterforms. This
    is different in kind from the earlier "black version" PNG problem, where the actual wordmark
    content itself was missing.
  - **Method, and a real mistake caught before shipping**: first attempt hand-transcribed the SVG
    with the fill swapped, but the file contains a large embedded base64 PNG (a decorative pattern
    texture on the icon) — transcribing a 13,308-character base64 string by hand truncated it to
    5,946 characters, silently corrupting that embedded image. Caught by comparing file sizes
    (20,107 bytes original vs. 12,759 bytes first attempt — a 7,348-byte gap too large to be just
    the fill-attribute text change) before shipping it, not after. Redone correctly via a targeted
    Python string-replace directly on a byte-for-byte read of the original file: located all 5
    occurrences of `fill="white"` (4 are the wordmark paths; the 5th is inside a `<mask>` element,
    where white/black define mask *luminance/visibility*, not visible color, and must never be
    touched), replaced only the first 4 with `fill="#000000"`, left everything else — including
    the full base64 blob — byte-identical. Verified: new file is 20,115 bytes (exactly the
    original's 20,107 + 8 bytes, matching 4 × the 2-character difference between `white` and
    `#000000`), the embedded base64 string matches the original character-for-character, the file
    parses as valid XML, and a rendered thumbnail (via macOS `qlmanage`, no SVG rasterizer was
    otherwise available this session) visually confirms: black "dana" wordmark, lime icon and its
    pattern-texture detail unchanged, transparent background.
  - Saved as `public/assets/dana_logo_dark.svg`. `Navbar.tsx` now swaps between `dana_logo.svg`
    (white wordmark, while `isOverHero`) and `dana_logo_dark.svg` (black wordmark, everywhere
    else) — same conditional structure already used for the CTA/link color treatment.
  - **Chip removed entirely, in both states** — per the explicit ask that the logo area stay fully
    transparent through every scroll position on every page. Both `.navbar__logo`'s base rule and
    the now-redundant `.navbar--on-dark .navbar__logo` override lost their `background-color`;
    since each logo file already has the correct contrast for its own background (white text needs
    the dark hero, black text needs the light page — neither needs a box), no chip is needed in
    either state anymore. This fully supersedes the dark-chip approach documented in the "Real
    Dana logo swapped in" entry earlier in this section — that was a reasonable stopgap when only
    a white-wordmark file existed; it isn't needed now that a correctly-colored dark version does.
  - Verified via `tsc --noEmit` (clean) and route-level `curl` checks (all still 200, including the
    new asset itself). Not verified in a live browser — recommend confirming visually that the
    swap at the hero boundary looks seamless (no flash of the wrong-colored logo).

- **Final CTA background swapped to a user-supplied image**, replacing the old solid
  `--color-primary` fill + separate `--gradient-glow` radial div — same reasoning as the Hero
  background swap earlier in this section: the supplied image (2000×857, saved as
  `public/assets/final-cta-bg.webp`) already has its own radial glow, concentric decorative arcs,
  and a faint grid pattern baked in, so the old programmatic glow div would be redundant on top of
  it. `background-color: var(--color-primary)` is kept as a fallback (same dark-green family as
  the image's own edges, so no color-mismatch flash if the image is slow to load). The
  `.final-cta__glow` div/CSS rule was removed entirely — this is genuinely reused chrome (same
  component renders on both the homepage and `/pricing`), so the change applies everywhere the
  banner appears, not just one page.
  - Since this section's own content (single centered headline/body/button) is much shorter than
    Hero's, its rendered box is closer to the image's own aspect ratio than Hero's tall device
    visual was — `background-position: center` (no special edge-anchoring) was used directly,
    without needing Hero's "anchor to bottom" adjustment; flagging that this hasn't been checked
    against the image's exact glow placement in a real browser, so revisit `background-position`
    if the glow ends up oddly cropped at unusual viewport heights.
  - The already-known, already-flagged ghost-button-border-visibility issue on this banner is
    unchanged by this swap — still a dark background, same unresolved concern, not touched here.
  - Verified via `tsc --noEmit` (clean), brace-balance check, and route-level `curl` (home,
    /pricing, and the new asset itself all 200). Not verified in a live browser.
