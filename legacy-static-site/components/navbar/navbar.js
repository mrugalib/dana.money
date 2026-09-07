/*
  Dana AI — Navbar behavior
  - Sticky -> glass transition after 40px scroll (design.md §5.1)
  - Desktop "About" dropdown: click/keyboard toggle, outside-click + Escape to close
  - Mobile: hamburger opens a full-screen glass menu; "About" becomes an inline
    accordion group inside it. Focus is trapped while the menu is open.
*/
(function () {
  const navbar = document.querySelector('[data-navbar]');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 40;

  /* ---- Sticky -> glass on scroll ---- */
  let ticking = false;
  function updateScrollState() {
    navbar.classList.toggle('is-scrolled', window.scrollY > SCROLL_THRESHOLD);
    ticking = false;
  }
  window.addEventListener(
    'scroll',
    function () {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    },
    { passive: true }
  );
  updateScrollState();

  /* ---- Desktop "About" dropdown ---- */
  const dropdown = navbar.querySelector('[data-dropdown]');
  const dropdownTrigger = navbar.querySelector('[data-dropdown-trigger]');
  const dropdownMenu = navbar.querySelector('[data-dropdown-menu]');

  function closeDropdown() {
    dropdownTrigger.setAttribute('aria-expanded', 'false');
    dropdownMenu.classList.remove('is-open');
  }

  function openDropdown() {
    dropdownTrigger.setAttribute('aria-expanded', 'true');
    dropdownMenu.classList.add('is-open');
  }

  if (dropdown && dropdownTrigger && dropdownMenu) {
    dropdownTrigger.addEventListener('click', function () {
      const isOpen = dropdownTrigger.getAttribute('aria-expanded') === 'true';
      isOpen ? closeDropdown() : openDropdown();
    });

    document.addEventListener('click', function (event) {
      if (!dropdown.contains(event.target)) closeDropdown();
    });

    dropdown.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeDropdown();
        dropdownTrigger.focus();
      }
    });
  }

  /* ---- Mobile full-screen menu ---- */
  const menuTrigger = document.querySelector('[data-menu-trigger]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  let lastFocused = null;

  function getFocusable() {
    return Array.from(
      mobileMenu.querySelectorAll('a, button:not([disabled])')
    ).filter((el) => el.offsetParent !== null);
  }

  function trapFocus(event) {
    if (event.key !== 'Tab') return;
    const focusable = getFocusable();
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openMobileMenu() {
    lastFocused = document.activeElement;
    menuTrigger.setAttribute('aria-expanded', 'true');
    menuTrigger.setAttribute('aria-label', 'Close menu');
    mobileMenu.removeAttribute('inert');
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onMobileMenuKeydown);
    const focusable = getFocusable();
    if (focusable.length) focusable[0].focus();
  }

  function closeMobileMenu() {
    menuTrigger.setAttribute('aria-expanded', 'false');
    menuTrigger.setAttribute('aria-label', 'Open menu');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('inert', '');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onMobileMenuKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function onMobileMenuKeydown(event) {
    if (event.key === 'Escape') {
      closeMobileMenu();
    } else {
      trapFocus(event);
    }
  }

  if (menuTrigger && mobileMenu) {
    menuTrigger.addEventListener('click', function () {
      const isOpen = menuTrigger.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMobileMenu() : openMobileMenu();
    });

    mobileMenu.querySelectorAll('[data-menu-link]').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  /* ---- Mobile "About" accordion group ---- */
  const groupTrigger = document.querySelector('[data-mobile-group-trigger]');
  const groupPanel = document.querySelector('[data-mobile-group-panel]');

  if (groupTrigger && groupPanel) {
    groupTrigger.addEventListener('click', function () {
      const isOpen = groupTrigger.getAttribute('aria-expanded') === 'true';
      groupTrigger.setAttribute('aria-expanded', String(!isOpen));
      groupPanel.classList.toggle('is-open', !isOpen);
    });
  }

  /* ---- Collapse mobile menu automatically if viewport grows past breakpoint ----
     Must match navbar.css's nav-collapse breakpoint (1200px, design.md §9), not the
     narrower 810px tablet tier used elsewhere for bar height. */
  const mql = window.matchMedia('(max-width: 1200px)');
  mql.addEventListener('change', function (event) {
    if (!event.matches && mobileMenu.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });
})();
