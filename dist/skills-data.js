/* Evidence records. To add an image, save it in dist and set its src to the
 * filename, alt to a short description, and caption to its context.
 * The UX/design record has separate before and after images.
 */
window.smartShieldSkills = {
  categories: [
    { type: 'business', title: 'Business solution skill', shortTitle: 'Business solution', indexDescription: 'Debit Card Fraud Demo Builder' },
    { type: 'design', title: 'UX and design skill', shortTitle: 'UX and design', indexDescription: 'Frontend Design Premium' },
    { type: 'testing', title: 'Testing and quality skill', shortTitle: 'Testing and quality', indexDescription: 'Playwright' }
  ],
  entries: [
    {
      type: 'business',
      name: 'Debit Card Fraud Demo Builder',
      purpose: 'Builds an explainable, synthetic debit-card fraud demonstration that scores transactions, routes uncertain purchases to verification, and reports fraud and false-decline outcomes.',
      input: 'A synthetic CSV transaction with purchase amount, recent average, merchant and device status, location, velocity, travel notice, customer verification response, and an evaluation-only fraud label.',
      interaction: 'The skill validates the row, creates explainable risk signals, and calculates a bounded 0–100 demo score. It assigns APPROVE (0–39), VERIFY (40–79), or DECLINE (80–100); VERIFY uses the customer’s YES or NO response to set the final action.',
      contribution: 'The demo shows the score, initial and final actions, reason codes, and a plain-English explanation, then rolls synthetic outcomes into fraud recall, false-decline rate, fraud dollars prevented, and legitimate dollars preserved.',
      acceptedChanges: 'Transaction details, AI risk score & decision, and explainable risk signals were all accepted in the working demo. Rejected changes include the mention of an input CSV transaction file and a “Run scenario” button that was found to be redundant.',
      screenshot: {
        before: {
          src: 'business-skill-before.png',
          alt: 'Before screenshot of the transaction simulator with synthetic CSV scenarios and a Run scenario button.'
        },
        after: {
          src: '',
          alt: '',
          placeholder: 'Add a screenshot of the updated working demo.'
        },
        summary: {
          title: 'Demonstration output',
          placeholder: 'The skill produces a synthetic transaction simulator, customer-verification flow, dashboard metrics, scenario controls, and scoring checks without using real cardholder data.'
        }
      }
    },
    {
      type: 'design',
      name: 'Frontend Design Premium',
      purpose: 'Helps design and improve interfaces to look intentional and remain usable across desktop and mobile, checking practical details such as responsive behavior, accessibility, and consistency across the entire site.',
      input: `We wanted help organizing the elements of this Skills & testing webpage. The prompt to Codex was:
I want to make some updates to our site. The Evidence section of this page has tables that do not look good when the window is shrunk or on mobile. Use [@Frontend Design Premium] to help come up with a better way to organize the requirements for this section, which include:`,
      inputLink: { text: '[@Frontend Design Premium]', href: 'https://chatgpt.com/plugins/plugins_6a7039f8e9708191bde88207b1919bf4' },
      inputOutline: {
        heading: 'Skills, MCPs, and Testing',
        items: [
          'Identify the three required Skills or MCPs and explain their distinct roles.',
          'Show meaningful evidence of the business-solution, UX/design, and testing/quality interactions, including important inputs, outputs, recommendations, tests, or resulting changes.'
        ]
      },
      interaction: `The Skill replaced the five-column tables with a role index and three evidence trails. Each trail names the skill and shows its input, interaction, resulting change, and source. The layout reflows into a single column on mobile.

The page had no horizontal overflow at 1280, 800, 390, or 320 pixels, or with enlarged text. The prototype’s decision checks passed 18/18.`,
      contribution: 'The sequence stays visible as columns on wide screens and reflows into one readable column on phones.',
      acceptedChanges: 'The sequencing changes were accepted, as it made all text legible on phone screens. Some UI placement changes were later updated in order to accomodate larger sections of text.',
      screenshot: {
        before: {
          src: 'skills-page-before.png',
          alt: 'Original mobile Evidence page with table text wrapping into narrow vertical columns.',
          caption: 'Original mobile layout, before the Evidence page redesign.'
        },
        after: {
          src: 'skills-page-after.png',
          alt: 'Updated mobile Evidence page with readable skill details and numbered interaction steps.',
          caption: 'Improved mobile layout after the table redesign.'
        }
      }
    },
    {
      type: 'testing',
      name: 'Playwright',
      purpose: 'Helps test and interact with websites by simulating how a real user uses them. It can navigate pages, click buttons, fill out forms, verify content, and identify broken or unexpected behavior.',
      input: `An early run included a simple prompt asking for [$playwright] to test the Home page and the Skills & testing page. Playwright is invoked throughout the entire build and deployment process to test that recent changes don't break existing page features.`,
      inputLink: { text: '[$playwright]', href: 'https://playwright.dev/' },
      interaction: 'Playwright executed tests on both pages and validated recent updates to font size and the video transcript. The Skill also confirmed that all 18 of its browser workflow checks passed, including mobile navigation.',
      contribution: 'Because Playwright found no errors in this test instance, it did not make any changes. However, it did call out that the Skills & testing page contained some outdated branding and recommended addressing that inconsistency.',
      acceptedChanges: 'The responsive layout, role link, and mobile menu were accepted after the browser checks passed. The inconsistent branding was remediated in a subsequent site update.',
      screenshot: {
        src: 'playwright-evidence.png',
        alt: 'Playwright test results showing Home and Skills and testing checks, including 18 of 18 browser workflow checks passed.'
      }
    }
  ]
};
