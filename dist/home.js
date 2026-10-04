(function () {
  'use strict';

  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  document.documentElement.classList.add('js-enabled');

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 60.01rem)').addEventListener('change', closeMenu);

})();
