"use client";

import { useState } from "react";
import "./FAQAccordion.css";

/**
 * Dana AI — FAQ Accordion (design.md §5.12, site map item 13).
 * Ported from legacy-static-site/components/faq/{faq.html,faq.css,faq.js}.
 *
 * Single-open accordion: opening one item closes any other, converted from faq.js's DOM
 * class/attribute toggling into a single `openId` state value. Panels use `aria-hidden` +
 * `.is-open` (not the HTML `hidden` attribute) because `hidden` forces `display:none`, which
 * can't animate `max-height` — this was a real bug fix in the original build, preserved here.
 *
 * First 4 Q&As are real content. The last 4 are placeholder trust-question topics (data privacy,
 * credit/loan eligibility, security standard, cashflow-score meaning) required by design.md §5.12
 * — every pending answer says plainly it needs input from Dana's compliance/product team; nothing
 * is invented to fill the gap.
 */

type FAQItem = {
  id: string;
  question: string;
  answer: string;
  pending?: boolean;
};

const faqItems: FAQItem[] = [
  {
    id: "faq-1",
    question: "Can I switch plans anytime?",
    answer:
      "Yes. You can upgrade or downgrade your plan at any time. The change will take effect in your next billing cycle.",
  },
  {
    id: "faq-2",
    question: "Is there a free plan?",
    answer:
      "Yes. Both user and sales officer memberships have a free Basic tier with limited features so you can try before upgrading.",
  },
  {
    id: "faq-3",
    question: "How do AI queries work?",
    answer:
      "AI queries allow you to ask our system for instant financial insights, comparisons, and recommendations. Your daily limit depends on your membership tier.",
  },
  {
    id: "faq-4",
    question: "How do sales officer requests work?",
    answer:
      "When you send a request, we connect you to qualified sales officers. Your reach per request depends on your plan's maximum officer limit.",
  },
  {
    id: "faq-5",
    question: "How is my financial data protected?",
    answer:
      "Needs input from Dana's compliance/product team — data privacy policy not yet finalized for publication.",
    pending: true,
  },
  {
    id: "faq-6",
    question: "How does credit and loan eligibility get decided?",
    answer:
      "Needs input from Dana's compliance/product team — eligibility mechanics not yet confirmed for publication.",
    pending: true,
  },
  {
    id: "faq-7",
    question: "What security standards does Dana follow?",
    answer:
      "Needs input from Dana's compliance/product team — no security certification/standard has been confirmed for publication.",
    pending: true,
  },
  {
    id: "faq-8",
    question: 'What exactly does my "cashflow score" mean?',
    answer:
      "Needs input from Dana's compliance/product team — the exact scoring methodology isn't public yet.",
    pending: true,
  },
];

export default function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section className="faq" id="faq" aria-label="Frequently Asked Questions">
      <div className="faq__container">
        <span className="pill-badge">
          <span className="pill-badge__dot" aria-hidden="true"></span>
          FAQ
        </span>
        <h2 className="faq__headline">Frequently Asked Questions</h2>

        <div className="faq__list">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            const triggerId = `faq-trigger-${item.id}`;
            const panelId = `faq-panel-${item.id}`;
            return (
              <div
                key={item.id}
                className={`faq__item${item.pending ? " faq__item--pending" : ""}`}
                data-reveal
              >
                <button
                  type="button"
                  className="faq__question"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  id={triggerId}
                  onClick={() => toggle(item.id)}
                >
                  {item.question}
                  <span className="faq__icon" aria-hidden="true"></span>
                </button>
                <div
                  className={`faq__answer${isOpen ? " is-open" : ""}`}
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                >
                  <p className={item.pending ? "faq__pending-note" : undefined}>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
