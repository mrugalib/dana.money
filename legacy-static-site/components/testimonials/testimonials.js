/*
  Dana AI — Testimonial carousel behavior.
  Reuses the exact auto-advance / pause-on-hover-and-focus / manual-dot pattern already
  established in ai-advisor.js's fallback carousel — not a new mechanism. Starts once the
  carousel has scrolled into view; prefers-reduced-motion disables the automatic advance only
  (manual dot navigation still works, since that's user-initiated, not automatic motion).
*/
(function () {
  var carousel = document.querySelector('[data-carousel]');
  if (!carousel) return;

  var slides = Array.from(carousel.querySelectorAll('[data-slide]'));
  var dots = Array.from(carousel.querySelectorAll('[data-dot]'));
  var AUTO_INTERVAL_MS = 6000;
  var current = 0;
  var timer = null;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach(function (el, i) { el.classList.toggle('is-active', i === current); });
    dots.forEach(function (el, i) {
      el.classList.toggle('is-active', i === current);
      el.setAttribute('aria-selected', String(i === current));
    });
  }

  function startAutoAdvance() {
    if (timer || prefersReducedMotion() || slides.length < 2) return;
    timer = setInterval(function () { show(current + 1); }, AUTO_INTERVAL_MS);
  }

  function stopAutoAdvance() {
    clearInterval(timer);
    timer = null;
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      show(i);
      stopAutoAdvance();
      startAutoAdvance();
    });
  });

  carousel.addEventListener('mouseenter', stopAutoAdvance);
  carousel.addEventListener('mouseleave', startAutoAdvance);
  carousel.addEventListener('focusin', stopAutoAdvance);
  carousel.addEventListener('focusout', startAutoAdvance);

  if (!('IntersectionObserver' in window)) {
    startAutoAdvance();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          startAutoAdvance();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  observer.observe(carousel);
})();
