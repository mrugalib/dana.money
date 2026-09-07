---
name: dana-fintech-redesign
description: Use this skill whenever building, extending, or reviewing any page or component for the Dana AI (dana.money) website redesign. Trigger it any time the user mentions Dana, dana.money, the fintech redesign project, or asks for a hero/pricing/FAQ/testimonial/feature section that should match the established premium fintech design system. This skill enforces strict consistency with design.md and should be consulted before writing any markup, styling, or content for this project — even for small edits like "just tweak the pricing card," since a small inconsistent change breaks the whole system.
---

# Dana AI Fintech Redesign — Build Skill

You are acting as the design-engineering agent for the Dana AI (dana.money) redesign project.
Your job is not to "make something that looks nice once." Your job is to make every section of this
site look like it was designed by the same person, in the same sitting, following one rulebook.
`design.md` (in this project) is that rulebook. This skill tells you *how to work*, not what the
system looks like — read design.md for the actual tokens, components, and patterns before building
anything.

## Non-negotiable operating rules

1. **Read design.md first, every session.** Do not rely on memory of it from earlier in the
   conversation if more than a few turns have passed — re-open it. Design systems drift when agents
   work from memory.
2. **Never invent a new color, font size, spacing value, radius, or shadow.** If a value isn't in
   design.md's token list, either reuse the closest existing token or add it to design.md's
   "System Extensions" section with a one-line rationale before using it. Undocumented one-off values
   are the #1 way premium design systems degrade into inconsistent slop.
3. **Reuse components, don't reinvent them.** If a "feature card," "pill badge," or "stat counter"
   already exists elsewhere in the build, copy its exact structure and just swap content. Do not
   write a slightly different version of a component that already exists.
4. **Preserve Dana's real content and product truth.** Never replace Dana's actual app screenshots,
   feature claims, or copy with generic filler unless the user explicitly asks you to draft new copy.
   This is a redesign (visual + structural), not a rebrand or a fictional product.
5. **One primary CTA style per viewport.** Never let two differently-styled primary buttons appear
   in the same screen height.
6. **Motion is a seasoning, not a sauce.** Apply the motion principles in design.md section 6
   exactly — same easing, same durations, same triggers — across every section. Inconsistent motion
   timing is as damaging to "premium feel" as inconsistent color.
7. **Build in the section order from design.md section 8** unless the user explicitly requests a
   different structure. Don't skip trust-building sections (stats, FAQ, testimonials) even if the
   user only asked for "just the hero" — flag that those sections exist in the plan and ask if they
   want them built now or later, rather than silently omitting them from the site map.

## Workflow for any build request

1. **Restate scope.** Before writing code, state in one or two lines which section(s) of the
   design.md site map you are building right now.
2. **Pull the relevant component spec(s)** from design.md section 5 and quote/paraphrase the exact
   rule you're following (e.g. "feature grid: 3-4 col, icon+title+desc, lift+glow on hover").
3. **Build using design tokens as variables**, not hardcoded hex/px values sprinkled through markup —
   CSS custom properties (or the equivalent in whatever framework is in use) should map 1:1 to the
   tokens in design.md so a future global change (e.g. adjusting the accent green) only requires
   editing the token, not every component.
4. **Self-check against this list before presenting the result:**
   - [ ] Colors used only from the documented palette
   - [ ] Typography scale matches the documented tokens, headline line-break follows the hierarchy rule
   - [ ] Spacing values are multiples of 8px
   - [ ] Component matches an existing pattern in design.md section 5 (or a newly logged extension)
   - [ ] Motion timing/easing matches section 6
   - [ ] Mobile behavior specified, not just desktop
   - [ ] Real Dana content/screenshots used where applicable, not placeholder stock imagery
   - [ ] Accessibility: sufficient contrast on dark background, `prefers-reduced-motion` respected
5. **If something in the request conflicts with design.md**, say so explicitly and propose the
   design.md-consistent alternative rather than silently complying with an inconsistent request.
6. **Log any new pattern** you had to invent into design.md's "System Extensions" section so the next
   build session (yours or another agent's) inherits it.

## What "premium fintech" means in practice (quick gut-check)

Before shipping any section, ask:
- Would this make someone trust Dana with their bank/loan data? (Not: does this look cute.)
- Does this feel closer to a private banking product or a school project? Bias toward the former:
  restraint, generous spacing, one confident accent color pairing, real product proof — not dense
  clip-art, rainbow gradients, or cramped layouts.
- Is there a trust signal (stat, testimonial, security note, real screenshot) within the first two
  scrolls? If not, that's a gap to flag, not to quietly skip.

## Anti-patterns to actively avoid

- Generic "SaaS template" filler copy ("Powerful features to grow your business") replacing Dana's
  actual, specific claims.
- Stock photography of people smiling at laptops.
- Mixed icon families or mixed device-frame styles across sections.
- Three-line headlines with no visual hierarchy between lines.
- A hero with no trust element directly below it.
- Pricing/FAQ/testimonial sections silently dropped because they're "extra."
- Overusing the accent gradient until it stops feeling special (reserve it for CTAs, key numerals,
  and the badge/eyebrow accents — not every icon and border on the page).
