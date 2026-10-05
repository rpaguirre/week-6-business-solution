(function () {
  'use strict';

  const data = window.smartShieldSkills;
  const index = document.getElementById('role-index');
  const groups = document.getElementById('skill-groups');

  if (!data || !Array.isArray(data.categories) || !Array.isArray(data.entries)) {
    groups.textContent = 'Evidence details are temporarily unavailable.';
    return;
  }

  const icons = {
    business: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="9" width="38" height="30" rx="5"/><path d="M5 19h38M13 29l6 5 13-12"/></svg>',
    design: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="6" width="36" height="36" rx="5"/><path d="M6 17h36M17 17v25M24 26h11M24 32h8"/></svg>',
    testing: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M24 4 7 11v12c0 11 7 17 17 21 10-4 17-10 17-21V11L24 4Z"/><path d="m16 24 6 6 11-13"/></svg>'
  };

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }

  function appendText(parent, value) {
    parent.append(element('p', '', value || 'Evidence has not been supplied yet.'));
  }

  function addEvidence(parent, evidence) {
    if (!evidence) return;
    const note = element('div', 'evidence-source');
    note.append(element('span', 'evidence-source__label', 'Source trail'));
    if (evidence.description) appendText(note, evidence.description);
    if (evidence.linkUrl) {
      try {
        const url = new URL(evidence.linkUrl, document.baseURI);
        if (['http:', 'https:'].includes(url.protocol)) {
          const link = element('a', 'evidence-link', evidence.linkText || 'View source');
          link.href = url.href;
          note.append(link);
        }
      } catch { /* Keep the written source trail when a link is malformed. */ }
    }
    parent.append(note);
  }

  function screenshotFrame(screenshot = {}, label = '') {
    const frame = element('div', 'evidence-screenshot__frame');
    const caption = screenshot.caption ? element('p', 'evidence-screenshot__caption', screenshot.caption) : null;
    const placeholder = () => {
      frame.classList.add('evidence-screenshot__frame--empty');
      const icon = element('span', 'evidence-screenshot__icon', '▣');
      icon.setAttribute('aria-hidden', 'true');
      frame.replaceChildren(
        icon,
        element('strong', '', 'Screenshot to be added'),
        element('p', '', screenshot.placeholder || 'Add a screenshot that shows this skill in use.')
      );
      caption?.remove();
    };

    let source;
    try {
      source = screenshot.src ? new URL(screenshot.src, document.baseURI) : null;
    } catch { source = null; }
    if (source && ['http:', 'https:'].includes(source.protocol) && screenshot.alt) {
      const image = element('img', 'evidence-screenshot__image');
      image.src = source.href;
      image.alt = screenshot.alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.addEventListener('error', placeholder, { once: true });
      if (label) {
        const link = element('a', 'evidence-screenshot__image-link');
        link.href = source.href;
        link.target = '_blank';
        link.rel = 'noopener';
        link.setAttribute('aria-label', `View full ${label.toLowerCase()} screenshot`);
        link.append(image);
        frame.append(link);
      } else {
        frame.append(image);
      }
    } else {
      placeholder();
    }
    return { frame, caption };
  }

  function addScreenshot(parent, screenshot = {}) {
    const section = element('section', 'evidence-screenshot');
    section.append(element('h4', '', 'Evidence'));
    if (screenshot.before || screenshot.after) {
      const comparison = element('div', 'evidence-screenshot__comparison');
      [['Before', screenshot.before], ['After', screenshot.after]].forEach(([label, shot]) => {
        const panel = element('div', 'evidence-screenshot__panel');
        panel.append(element('h5', '', label));
        const { frame, caption } = screenshotFrame(shot, label);
        frame.classList.add('evidence-screenshot__frame--comparison');
        panel.append(frame);
        if (caption) panel.append(caption);
        comparison.append(panel);
      });
      section.append(comparison);
    } else {
      const { frame, caption } = screenshotFrame(screenshot);
      section.append(frame);
      if (caption) section.append(caption);
    }
    parent.append(section);
  }

  data.categories.forEach((category) => {
    const anchor = `role-${category.type}`;
    const indexLink = element('a', 'role-index__link');
    indexLink.href = `#${anchor}`;
    indexLink.append(element('span', 'role-index__icon'));
    indexLink.firstChild.innerHTML = icons[category.type] || '';
    const indexCopy = element('span', 'role-index__copy');
    indexCopy.append(element('strong', '', category.shortTitle), element('small', '', category.indexDescription));
    indexLink.append(indexCopy, element('span', 'role-index__arrow', '↓'));
    index.append(indexLink);

    const entries = data.entries.filter((entry) => entry.type === category.type);
    entries.forEach((entry) => {
      const article = element('article', `skill-record skill-record--${category.type}`);
      article.id = anchor;

      const identity = element('div', 'skill-record__identity');
      identity.append(element('p', 'skill-record__role', category.title));
      identity.append(element('h3', '', entry.name || 'Tool name pending'));
      appendText(identity, entry.purpose);
      article.append(identity);

      const trail = element('ol', 'evidence-trail');
      [
        ['Input', entry.input],
        ['Interaction', entry.interaction],
        ['Resulting change', entry.contribution]
      ].forEach(([label, value]) => {
        const step = element('li', 'evidence-trail__step');
        step.append(element('h4', '', label));
        appendText(step, value);
        trail.append(step);
      });
      article.append(trail);
      addEvidence(article, entry.evidence);
      addScreenshot(article, entry.screenshot);
      groups.append(article);
    });
  });
})();
