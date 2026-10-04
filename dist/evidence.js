(function () {
  'use strict';

  const data = window.smartShieldSkills;
  const categoryGrid = document.getElementById('category-grid');
  const groups = document.getElementById('skill-groups');

  if (!data || !Array.isArray(data.categories) || !Array.isArray(data.entries)) {
    groups.textContent = 'Skill details are temporarily unavailable.';
    return;
  }

  const icons = {
    business: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="9" width="38" height="30" rx="5"/><path d="M5 19h38M13 29l6 5 13-12"/></svg>',
    design: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="6" width="36" height="36" rx="5"/><path d="M6 17h36M17 17v25M24 26h11M24 32h8"/></svg>',
    testing: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M24 4 7 11v12c0 11 7 17 17 21 10-4 17-10 17-21V11L24 4Z"/><path d="m16 24 6 6 11-13"/></svg>'
  };
  const columns = [
    ['name', 'Skill / MCP Name'],
    ['purpose', 'Purpose'],
    ['evidence', 'Evidence'],
    ['interaction', 'Meaningful Interaction'],
    ['contribution', 'What It Contributed or Changed']
  ];

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }

  function placeholder() {
    const node = element('span', 'field-placeholder');
    const icon = element('span', 'field-placeholder__icon', '○');
    icon.setAttribute('aria-hidden', 'true');
    node.append(icon, document.createTextNode('To be added'));
    return node;
  }

  function filledText(value) {
    return typeof value === 'string' && value.trim()
      ? element('span', 'field-value', value.trim())
      : placeholder();
  }

  function validUrl(value) {
    if (typeof value !== 'string' || !value.trim()) return null;
    try {
      const url = new URL(value.trim(), document.baseURI);
      return ['http:', 'https:', 'file:'].includes(url.protocol) ? url.href : null;
    } catch {
      return null;
    }
  }

  function evidenceContent(entry) {
    const box = element('div', 'evidence-content');
    const evidence = entry.evidence || {};
    const description = typeof evidence.description === 'string' ? evidence.description.trim() : '';
    const link = validUrl(evidence.linkUrl);
    const image = validUrl(evidence.imageSrc);
    const alt = typeof evidence.imageAlt === 'string' ? evidence.imageAlt.trim() : '';

    if (description) box.append(element('span', 'field-value', description));
    if (link) {
      const anchor = element('a', 'evidence-link', `View evidence for ${entry.name?.trim() || 'this skill'}`);
      anchor.href = link;
      box.append(anchor);
    }
    if (image && alt) {
      const screenshot = element('img', 'evidence-image');
      screenshot.src = image;
      screenshot.alt = alt;
      screenshot.loading = 'lazy';
      box.append(screenshot);
    }
    if (!box.childNodes.length) box.append(placeholder());
    return box;
  }

  function interactionContent(value, id) {
    if (typeof value !== 'string' || !value.trim()) return placeholder();
    const full = value.trim();
    if (full.length <= 280) return filledText(full);

    const wrap = element('div', 'interaction-content');
    const breakAt = full.lastIndexOf(' ', 280);
    const preview = full.slice(0, breakAt > 180 ? breakAt : 280).trimEnd() + '…';
    const text = element('span', 'field-value', preview);
    text.id = id;
    const button = element('button', 'read-more', 'Read more');
    button.type = 'button';
    button.setAttribute('aria-controls', id);
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      text.textContent = expanded ? preview : full;
      button.textContent = expanded ? 'Read more' : 'Read less';
      button.setAttribute('aria-expanded', String(!expanded));
    });
    wrap.append(text, button);
    return wrap;
  }

  data.categories.forEach((category, categoryIndex) => {
    const entries = data.entries.filter((entry) => entry.type === category.type);
    const card = element('article', 'category-card panel--light');
    const icon = element('span', 'category-icon');
    icon.innerHTML = icons[category.type] || '';
    card.append(icon, element('h3', '', category.title), element('p', '', category.description));
    categoryGrid.append(card);

    const section = element('section', 'skill-group');
    const heading = element('div', 'skill-group__heading');
    const headingIcon = element('span', 'skill-group__icon');
    headingIcon.innerHTML = icons[category.type] || '';
    heading.append(headingIcon, element('h3', '', category.title));
    section.append(heading);

    const table = element('table', 'skill-table');
    table.append(element('caption', 'sr-only', `${category.title}: skill names, purpose, evidence, interaction, and contribution`));
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    columns.forEach(([key, label]) => {
      const th = element('th', '', label);
      th.scope = 'col';
      th.id = `col-${category.type}-${key}`;
      headerRow.append(th);
    });
    thead.append(headerRow);
    table.append(thead);

    const tbody = document.createElement('tbody');
    entries.forEach((entry, rowIndex) => {
      const row = document.createElement('tr');
      columns.forEach(([key, label]) => {
        const cell = document.createElement(key === 'name' ? 'th' : 'td');
        if (key === 'name') cell.scope = 'row';
        cell.setAttribute('headers', `col-${category.type}-${key}`);
        cell.setAttribute('data-label', label);
        if (key === 'evidence') cell.append(evidenceContent(entry));
        else if (key === 'interaction') cell.append(interactionContent(entry.interaction, `interaction-${categoryIndex}-${rowIndex}`));
        else cell.append(filledText(entry[key]));
        row.append(cell);
      });
      tbody.append(row);
    });
    table.append(tbody);
    section.append(table);
    groups.append(section);
  });

})();
