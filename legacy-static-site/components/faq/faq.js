/*
  Dana AI — FAQ accordion behavior (design.md §5.12: single-open, ~250ms height transition,
  plus-to-x icon rotation).
*/
(function () {
  var items = document.querySelectorAll('.faq__item');
  if (!items.length) return;

  function closeItem(item) {
    var trigger = item.querySelector('.faq__question');
    var panel = item.querySelector('.faq__answer');
    trigger.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    panel.classList.remove('is-open');
  }

  function openItem(item) {
    var trigger = item.querySelector('.faq__question');
    var panel = item.querySelector('.faq__answer');
    trigger.setAttribute('aria-expanded', 'true');
    panel.setAttribute('aria-hidden', 'false');
    panel.classList.add('is-open');
  }

  items.forEach(function (item) {
    var trigger = item.querySelector('.faq__question');
    trigger.addEventListener('click', function () {
      var isOpen = trigger.getAttribute('aria-expanded') === 'true';
      // single-open: close every other item first
      items.forEach(function (other) {
        if (other !== item) closeItem(other);
      });
      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });
})();
