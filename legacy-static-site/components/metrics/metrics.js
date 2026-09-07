/*
  Dana AI — Stat / Metrics count-up (design.md §6: "animate numeric value from 0 to target over
  ~1.2s when scrolled into view, ease").

  FIGURES PENDING (see design.md §9): every `value` below is a placeholder zero, not an invented
  number — no real public figures exist yet for active users, cashflow scores generated, loans
  facilitated, or average rating. This object is the single source of truth for these stats:
  swapping in real numbers later is a one-line edit per stat here, nothing else needs to change.
*/
var STATS_CONFIG = {
  'users':            { value: 0, decimals: 0, suffix: '+' },
  'cashflow-scores':   { value: 0, decimals: 0, suffix: '+' },
  'loans':             { value: 0, decimals: 0, suffix: '+' },
  'rating':            { value: 0, decimals: 1, suffix: '★' },
};

(function () {
  var counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  var DURATION_MS = 1200;

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function formatValue(current, decimals, suffix) {
    return current.toFixed(decimals) + suffix;
  }

  // Approximates CSS "ease" (cubic-bezier(0.25,0.1,0.25,1)) closely enough for a decorative
  // count-up — exact curve fidelity isn't critical here, easeOutCubic reads the same way.
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el, config) {
    var start = null;
    function tick(timestamp) {
      if (start === null) start = timestamp;
      var elapsed = timestamp - start;
      var progress = Math.min(1, elapsed / DURATION_MS);
      var eased = easeOutCubic(progress);
      el.textContent = formatValue(config.value * eased, config.decimals, config.suffix);
      if (progress < 1) {
        window.requestAnimationFrame(tick);
      }
    }
    window.requestAnimationFrame(tick);
  }

  counters.forEach(function (el) {
    var config = STATS_CONFIG[el.dataset.key];
    if (!config) return;

    if (prefersReducedMotion()) {
      el.textContent = formatValue(config.value, config.decimals, config.suffix);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      animateCounter(el, config);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(el, config);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
  });
})();
