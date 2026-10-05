/* Evidence records. To add a screenshot, save it in dist and set screenshot.src
 * to its filename, screenshot.alt to a short description, and caption to its context.
 */
window.smartShieldSkills = {
  categories: [
    { type: 'business', title: 'Business solution skill', shortTitle: 'Business solution', indexDescription: 'Decision Policy v1' },
    { type: 'design', title: 'UX and design skill', shortTitle: 'UX and design', indexDescription: 'Frontend Design Premium' },
    { type: 'testing', title: 'Testing and quality skill', shortTitle: 'Testing and quality', indexDescription: 'Playwright' }
  ],
  entries: [
    {
      type: 'business',
      name: 'Decision Policy v1',
      purpose: 'Applies the demo’s approve, verify, block, and recovery rules to synthetic debit purchases.',
      input: '$800 purchase; network risk 25; unfamiliar merchant; recognized device; supported wallet.',
      interaction: 'The policy adds 15 for the unfamiliar merchant and 15 for an amount of at least $500. Score 55 falls in the verify range. A customer “yes” or “no” resolves the next action.',
      contribution: 'The working demo asks “Was this you?” A yes approves the synthetic purchase; a no blocks it and offers a simulated recovery path.',
      evidence: {
        description: 'The project policy specifies the thresholds; the demo’s evaluate, confirm, and recover functions apply them. These are illustrative rules, not a live bank decision.',
        linkUrl: 'https://github.com/rpaguirre/week-6-business-solution/blob/main/skills/decision-policy/SKILL.md',
        linkText: 'Read the decision policy'
      },
      screenshot: { src: '', alt: '', caption: '', placeholder: 'Show the sample purchase input and its verify or recovery result.' }
    },
    {
      type: 'design',
      name: 'Frontend Design Premium',
      purpose: 'Makes the evidence readable and easy to inspect across desktop, narrow windows, and mobile.',
      input: 'The Evidence page used a five-column table for three distinct roles. Its cells became a long, repetitive stack on small screens.',
      interaction: 'The design review called for a quick role index and a consistent input → interaction → resulting change sequence for each skill, with source details kept alongside the claim.',
      contribution: 'This page now uses three evidence records. The sequence stays visible as columns on wide screens and reflows into one readable column on phones.',
      evidence: {
        description: 'The revised Evidence page is the design output. It retains the Northstar colors and navigation while replacing the table layout.'
      },
      screenshot: { src: '', alt: '', caption: '', placeholder: 'Show the Evidence layout on a desktop and a phone.' }
    },
    {
      type: 'testing',
      name: 'Playwright',
      purpose: 'Automates a real browser to test page behavior and layouts at different screen sizes.',
      input: 'The Evidence page at 1280, 800, 390, and 320 pixel widths, plus role links and the mobile menu.',
      interaction: 'Playwright opened the local page, checked for horizontal overflow and page errors, followed a role link, and opened the mobile menu.',
      contribution: 'All three records rendered, none of the checked widths overflowed, the role link and menu worked, and the browser reported no page errors.',
      evidence: {
        description: 'These are local browser checks of the Evidence page. They do not measure the accuracy of a production fraud system.',
        linkUrl: 'https://playwright.dev/docs/intro',
        linkText: 'About Playwright'
      },
      screenshot: { src: '', alt: '', caption: '', placeholder: 'Show the Playwright browser check or its results.' }
    }
  ]
};
