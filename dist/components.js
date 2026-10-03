(function () {
  'use strict';

  const disclaimer = 'Everyday Access is a fictional concept created for entertainment purposes only. This website is not intended to market, advertise, or offer any real financial product or service. No accounts, cards, or services are available, and all names, features, and scenarios shown are illustrative.';
  const pages = [
    ['Home', 'index.html'],
    ['Working solution', 'solution.html'],
    ['Marketing', 'marketing.html'],
    ['Skills & testing', 'evidence.html'],
    ['Impact & guide', 'guide.html']
  ];

  function renderFooter() {
    let footer = document.querySelector('footer');
    if (!footer) {
      footer = document.createElement('footer');
      document.body.append(footer);
    }
    footer.className = 'site-footer';
    footer.replaceChildren();

    const inner = document.createElement('div');
    inner.className = 'container';
    const top = document.createElement('div');
    top.className = 'site-footer__top';
    const brand = document.createElement('div');
    brand.className = 'site-footer__brand';
    brand.textContent = 'Everyday Access';
    const sub = document.createElement('p');
    sub.textContent = 'Protection you can see and control.';
    brand.append(sub);

    const nav = document.createElement('nav');
    nav.className = 'footer-nav';
    nav.setAttribute('aria-label', 'Site pages');
    const current = location.pathname.split('/').pop() || 'index.html';
    pages.forEach(([label, href]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      if (href === current) link.setAttribute('aria-current', 'page');
      nav.append(link);
    });
    top.append(brand, nav);

    const finePrint = document.createElement('p');
    finePrint.className = 'site-footer__disclaimer';
    finePrint.textContent = disclaimer;
    inner.append(top, finePrint);
    footer.append(inner);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFooter, { once: true });
  } else {
    renderFooter();
  }
})();
