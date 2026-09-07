/*
  Dana AI — Footer newsletter form.
  No real newsletter/email backend exists yet (see footer.html header comment / design.md §9) —
  this only prevents the default full-page-reload submission. It does not fake a "Subscribed!"
  success message, since that would misrepresent something that didn't actually happen.
*/
(function () {
  var form = document.querySelector('[data-newsletter-form]');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
  });
})();
