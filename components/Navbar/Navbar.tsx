"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./Navbar.css";

/**
 * Dana AI — Sticky Navbar (design.md §5.1, §5.2).
 * Ported from legacy-static-site/components/navbar/{navbar.html,navbar.css,navbar.js} — same
 * markup/classes/behavior, re-expressed as React state instead of direct DOM mutation. This is
 * the reference conversion pattern other components in this migration follow.
 *
 * Global chrome: mounted once in app/layout.tsx, so it renders on every route. Same-page anchor
 * links (#features, #how-it-works, #rewards, #get-dana-ai) only exist on the homepage — hrefs are
 * "/#features" etc. (not bare "#features") so they resolve correctly when clicked from any other
 * route, not just when already on "/". This is a necessary adaptation of a component that used to
 * be homepage-only markup and is now shared across the whole site — see design.md §9.
 *
 * "On dark section" state (System Extension, design.md §9): some sections have a background dark
 * enough (the homepage Hero's dark-green image; the Dana Lab page's "Let's Connect With an Expert"
 * CTA banner, --gradient-brand black -> dark green) that the navbar's default palette (dark-green
 * links, dark-green CTA fill — calibrated for the plain white page background every other section
 * uses) becomes nearly invisible against it (~1.15:1 sampled contrast). Rather than hardcode this
 * to the Hero alone, any section can opt in by rendering a `data-navbar-dark` attribute; this
 * effect observes every such element currently on the page via one shared IntersectionObserver and
 * sets `isOverDark` true for as long as the navbar overlaps *any* of them, applying the
 * `.navbar--on-dark` class for that window only. Every other page/route, and any page once
 * scrolled past its last dark section, use the unchanged default treatment. See Navbar.css for the
 * actual color overrides.
 *
 * Logo swap (System Extension, design.md §9): two real logo files, no chip/backdrop in either
 * state, always fully transparent. While `isOverDark`, renders the original white-wordmark
 * `dana_logo.svg` directly on the dark section. Otherwise swaps to
 * `dana_logo_dark.svg` — a byte-identical copy of the same real SVG with only the four wordmark
 * `fill="white"` paths recolored to `fill="#000000"` (the lime icon and its embedded pattern
 * detail are untouched, verified byte-for-byte against the original) — which reads directly on
 * the white page with no backdrop needed. This supersedes the earlier dark-chip approach, which
 * was only ever a stopgap for not having a usable dark-text logo file.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const SCROLL_THRESHOLD = 40;
  const COLLAPSE_BREAKPOINT = "(max-width: 1200px)";
  /* Matches the desktop navbar bar height (--space-10, 80px). Mobile's shorter 64px bar means
     "on dark" flips off up to 16px earlier than strictly necessary there — imperceptible, and
     far simpler than re-measuring the bar on every breakpoint crossing. */
  const NAVBAR_MAX_HEIGHT = 80;

  /* ---- Sticky -> glass on scroll (rAF-throttled, same as navbar.js) ---- */
  useEffect(() => {
    let ticking = false;
    function updateScrollState() {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    }
    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- "On dark section" detection: true while the navbar overlaps any `[data-navbar-dark]`
     element currently on the page (the homepage Hero, the Dana Lab CTA banner, etc.). One shared
     observer tracks which of those elements are currently intersecting; `isOverDark` is true iff
     that set is non-empty. Re-runs on pathname change since the root layout persists across
     client-side navigation (same reasoning as ScrollRevealInit) — otherwise this would only ever
     check whichever page loaded first. ---- */
  useEffect(() => {
    const darkSections = Array.from(document.querySelectorAll<HTMLElement>("[data-navbar-dark]"));
    if (darkSections.length === 0) {
      setIsOverDark(false);
      return;
    }

    const intersecting = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target);
          else intersecting.delete(entry.target);
        }
        setIsOverDark(intersecting.size > 0);
      },
      { rootMargin: `-${NAVBAR_MAX_HEIGHT}px 0px 0px 0px`, threshold: 0 }
    );
    darkSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  /* ---- Desktop "About" dropdown: outside-click + Escape to close ---- */
  useEffect(() => {
    if (!isDropdownOpen) return;

    function handleClick(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        dropdownTriggerRef.current?.focus();
      }
    }
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [isDropdownOpen]);

  /* ---- Mobile full-screen menu: focus trap + body scroll lock ---- */
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    lastFocusedRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    function getFocusable(): HTMLElement[] {
      if (!mobileMenuRef.current) return [];
      return Array.from(
        mobileMenuRef.current.querySelectorAll<HTMLElement>("a, button:not([disabled])")
      ).filter((el) => el.offsetParent !== null);
    }

    const focusable = getFocusable();
    focusable[0]?.focus();

    function onKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const els = getFocusable();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeydown);

    return () => {
      document.removeEventListener("keydown", onKeydown);
      document.body.style.overflow = "";
      lastFocusedRef.current?.focus();
    };
  }, [isMobileMenuOpen]);

  /* ---- Auto-close mobile menu if viewport grows past the collapse breakpoint ---- */
  useEffect(() => {
    const mql = window.matchMedia(COLLAPSE_BREAKPOINT);
    function handleChange(event: MediaQueryListEvent) {
      if (!event.matches) setIsMobileMenuOpen(false);
    }
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <header
      ref={headerRef}
      className={`navbar${isScrolled ? " is-scrolled" : ""}${isOverDark ? " navbar--on-dark" : ""}`}
      data-navbar
    >
      <div className="navbar__container">
        <Link href="/" className="navbar__logo" aria-label="Dana AI — home">
          {isOverDark ? (
            <Image src="/assets/dana_logo.svg" width={120} height={45} alt="Dana AI" />
          ) : (
            <Image src="/assets/dana_logo_dark.svg" width={120} height={45} alt="Dana AI" />
          )}
        </Link>

        <nav className="navbar__nav" aria-label="Primary">
          <ul className="navbar__links">
            <li><Link href="/#features" className="navbar__link">Solutions</Link></li>
            <li><Link href="/#how-it-works" className="navbar__link">How it works</Link></li>
            <li><Link href="/#rewards" className="navbar__link">Learn and Earn</Link></li>
            <li><Link href="/lab" className="navbar__link">Dana Labs</Link></li>
            <li><Link href="/blog" className="navbar__link">Blog</Link></li>
            <li><Link href="/pricing" className="navbar__link">Pricing</Link></li>
            <li className="navbar__dropdown" ref={dropdownRef}>
              <button
                ref={dropdownTriggerRef}
                type="button"
                className="navbar__link navbar__dropdown-trigger"
                id="about-trigger"
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                aria-controls="about-menu"
                onClick={() => setIsDropdownOpen((open) => !open)}
              >
                About
                <svg className="navbar__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <ul
                className={`navbar__dropdown-menu${isDropdownOpen ? " is-open" : ""}`}
                id="about-menu"
                role="menu"
                aria-labelledby="about-trigger"
              >
                <li role="none"><Link role="menuitem" href="/team" className="navbar__dropdown-link">Team</Link></li>
                <li role="none"><Link role="menuitem" href="/career" className="navbar__dropdown-link">Career</Link></li>
                <li role="none"><Link role="menuitem" href="/media" className="navbar__dropdown-link">Media</Link></li>
              </ul>
            </li>
          </ul>
        </nav>

        <Link href="/#get-dana-ai" className="btn btn--primary navbar__cta">Get Dana AI</Link>

        <button
          ref={menuTriggerRef}
          type="button"
          className="navbar__hamburger"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile: full-screen glass menu */}
      <div
        ref={mobileMenuRef}
        className={`mobile-menu${isMobileMenuOpen ? " is-open" : ""}`}
        id="mobile-menu"
        inert={!isMobileMenuOpen || undefined}
      >
        <ul className="mobile-menu__links">
          <li><Link href="/#features" className="mobile-menu__link" onClick={closeMobileMenu}>Solutions</Link></li>
          <li><Link href="/#how-it-works" className="mobile-menu__link" onClick={closeMobileMenu}>How it works</Link></li>
          <li><Link href="/#rewards" className="mobile-menu__link" onClick={closeMobileMenu}>Learn and Earn</Link></li>
          <li><Link href="/lab" className="mobile-menu__link" onClick={closeMobileMenu}>Dana Labs</Link></li>
          <li><Link href="/blog" className="mobile-menu__link" onClick={closeMobileMenu}>Blog</Link></li>
          <li><Link href="/pricing" className="mobile-menu__link" onClick={closeMobileMenu}>Pricing</Link></li>
          <li className="mobile-menu__group">
            <button
              type="button"
              className="mobile-menu__link mobile-menu__group-trigger"
              aria-expanded={isMobileAboutOpen}
              aria-controls="about-mobile-panel"
              onClick={() => setIsMobileAboutOpen((open) => !open)}
            >
              About
              <svg className="navbar__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <ul className={`mobile-menu__submenu${isMobileAboutOpen ? " is-open" : ""}`} id="about-mobile-panel">
              <li><Link href="/team" className="mobile-menu__sublink" onClick={closeMobileMenu}>Team</Link></li>
              <li><Link href="/career" className="mobile-menu__sublink" onClick={closeMobileMenu}>Career</Link></li>
              <li><Link href="/media" className="mobile-menu__sublink" onClick={closeMobileMenu}>Media</Link></li>
            </ul>
          </li>
        </ul>
        <Link href="/#get-dana-ai" className="btn btn--primary mobile-menu__cta" onClick={closeMobileMenu}>Get Dana AI</Link>
      </div>
    </header>
  );
}
