/*
  Dana AI — AI Advisor phone screen reveal.
  Two modes, switched by viewport width + prefers-reduced-motion (design.md §9):
    - Desktop, motion allowed: pinned scroll-scrub. `.ai-advisor__track` gets `.is-scrub-enabled`
      (CSS pins the stage and gives the track scroll height); a rAF-throttled scroll listener
      (same throttling pattern as navbar.js) reads real measured rects each tick and maps scroll
      progress through the track to an active-screen index.
    - Mobile, or prefers-reduced-motion: simple auto-cycling cross-fade once the phone scrolls
      into view (no pin, no scroll hijacking) — same behavior as the original build.
  Manual dot controls work identically in both modes and always pause/reset the relevant timer.
*/
(function () {
  const track = document.querySelector('[data-scrub-track]');
  const stage = document.querySelector('[data-scrub-stage]');
  const phone = document.querySelector('[data-phone-cycle]');
  if (!track || !stage || !phone) return;

  const screens = Array.from(phone.querySelectorAll('.ai-advisor__screenshot'));
  const dots = Array.from(document.querySelectorAll('[data-dot]'));
  const AUTO_INTERVAL_MS = 3500;
  const DESKTOP_BREAKPOINT = 810;

  let current = 0;
  let autoTimer = null;
  let scrubTicking = false;
  let scrubActive = false;
  let intersectionObserver = null;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function isDesktopWidth() {
    return window.innerWidth > DESKTOP_BREAKPOINT;
  }

  function show(index) {
    current = Math.min(screens.length - 1, Math.max(0, index));
    screens.forEach(function (el, i) {
      const active = i === current;
      el.classList.toggle('is-active', active);
      el.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach(function (el, i) {
      el.classList.toggle('is-active', i === current);
      el.setAttribute('aria-selected', String(i === current));
    });
  }

  /* ---- Auto-cycle mode (mobile / reduced motion) ---- */
  function startAutoAdvance() {
    if (autoTimer || prefersReducedMotion()) return;
    autoTimer = setInterval(function () { show((current + 1) % screens.length); }, AUTO_INTERVAL_MS);
  }

  function stopAutoAdvance() {
    clearInterval(autoTimer);
    autoTimer = null;
  }

  function observeForAutoStart() {
    if (intersectionObserver) return;
    if (!('IntersectionObserver' in window)) {
      startAutoAdvance();
      return;
    }
    intersectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            startAutoAdvance();
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    intersectionObserver.observe(phone);
  }

  /* ---- Scroll-scrub mode (desktop, motion allowed) ---- */
  function updateScrub() {
    const scrollable = track.offsetHeight - stage.offsetHeight;
    const rect = track.getBoundingClientRect();
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
    const index = Math.min(screens.length - 1, Math.floor(progress * screens.length));
    if (index !== current) show(index);
    scrubTicking = false;
  }

  function onScroll() {
    if (!scrubTicking) {
      window.requestAnimationFrame(updateScrub);
      scrubTicking = true;
    }
  }

  function enableScrub() {
    if (scrubActive) return;
    scrubActive = true;
    track.classList.add('is-scrub-enabled');
    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrub();
  }

  function disableScrub() {
    if (!scrubActive) return;
    scrubActive = false;
    track.classList.remove('is-scrub-enabled');
    window.removeEventListener('scroll', onScroll);
  }

  /* ---- Mode switch ---- */
  function applyMode() {
    if (isDesktopWidth() && !prefersReducedMotion()) {
      stopAutoAdvance();
      enableScrub();
    } else {
      disableScrub();
      show(0);
      observeForAutoStart();
    }
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      show(i);
      if (!scrubActive) {
        stopAutoAdvance();
        startAutoAdvance();
      }
    });
  });

  phone.addEventListener('mouseenter', stopAutoAdvance);
  phone.addEventListener('mouseleave', function () { if (!scrubActive) startAutoAdvance(); });
  phone.addEventListener('focusin', stopAutoAdvance);
  phone.addEventListener('focusout', function () { if (!scrubActive) startAutoAdvance(); });

  let resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(applyMode, 200);
  });

  applyMode();
})();
