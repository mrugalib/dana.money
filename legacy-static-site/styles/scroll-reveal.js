/*
  Dana AI — Shared scroll-reveal trigger (design.md §6).
  Observes every [data-reveal] element on the page; reveals it once it enters the viewport, then
  stops observing it ("never animate more than once per element per visit"). Pairs with
  styles/reveal.css. Load this once per page, after all [data-reveal] markup has been injected.
*/
(function () {
  var els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  els.forEach(function (el) { observer.observe(el); });
})();
