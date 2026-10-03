# Website Requirements

Build a website with **exactly five pages** that explains a business problem, demonstrates a working solution, markets its value, documents Skill/MCP contributions, and guides users.

## Required Pages

### 1. Home: The Problem and Why It Matters

- Explain the problem, who experiences it, and why it matters.
- Introduce the team's proposed solution.
- Embed a **Problem Video of at least 15 seconds** showing a user or customer experiencing the problem.

### 2. Working Solution

- Provide a complete, functioning workflow: **input, question, or choice → useful result**.
- Ensure the **Business Solution Skill or MCP materially contributes** to the workflow.
- A simulation or prototype is acceptable when a real external connection is impractical, but the demonstrated workflow must function.

### 3. Marketing the Solution

- Use a clear, benefit-focused headline for the intended customer.
- Concisely explain what the solution does and why someone would use it.
- Embed a **Marketing Video of at least 15 seconds**: a short advertisement communicating the solution's value to its intended audience.
- Make the page itself sell the solution; do more than explain the advertisement.
- The advertisement does not need to demonstrate the website or explain its technical operation.

### 4. Skills, MCPs, and Testing

- Identify the **three required Skills or MCPs** and explain their distinct roles:
  1. Business solution
  2. UX/design
  3. Testing/quality
- Show meaningful evidence of interactions for each role, including relevant inputs, outputs, recommendations, tests, or resulting changes.

### 5. Impact and Usage Guide

- Give clear, repeatable steps another person can follow to use the solution.
- Describe expected impact using evidence or **clearly labeled estimates**.
- Identify limitations, assumptions, and a realistic next improvement.

## Requirements Across the Website

- Every page must contain useful content related to the business problem.
- Every page must provide working navigation to all four other required pages.
- Both required videos must be embedded on their designated pages.
- Each finished video must be **at least 15 seconds long**. Multiple shorter AI-generated clips may be edited together; one continuous generated clip is not required.
- Videos from **Week 6 may be reused**.

## Completion Checklist

- [ ] Exactly five pages, covering all required page purposes.
- [ ] Useful business-related content and working navigation on every page.
- [ ] Home explains the problem, affected users, importance, and proposed solution.
- [ ] Embedded Problem Video shows the problem and runs at least 15 seconds.
- [ ] Main workflow functions from user input to a useful result.
- [ ] Business Solution Skill/MCP materially contributes to that workflow.
- [ ] Marketing page sells customer benefits with a clear headline and concise explanation.
- [ ] Embedded Marketing Video communicates value and runs at least 15 seconds.
- [ ] Three Skills/MCPs have distinct roles and meaningful interaction evidence.
- [ ] Usage instructions are clear enough for another person to follow.
- [ ] Expected impact is supported by evidence or labeled estimates.
- [ ] Limitations, assumptions, and a realistic next improvement are stated.

## Home page implementation

Open `dist/index.html` directly in a browser; no build step or external dependency is required. The home page uses semantic HTML and lightweight vanilla JavaScript.

| File | Purpose |
| --- | --- |
| `dist/tokens.css` | Shared color, type, spacing, radius, shadow, and motion tokens. |
| `dist/components.css` | Shared buttons, panels, badges, navigation, footer, and focus styles. |
| `dist/components.js` | Renders the same five-page footer and exact entertainment disclaimer on every page that includes it. |
| `dist/home.css` | Home page layout and responsive presentation. |
| `dist/home.js` | Mobile menu, video slot, purchase simulator, and confirmation preview. |
| `dist/index.html` | Home page content and accessible structure. |

The other four pages retain their existing `dist/style.css` and `dist/app.js` implementation. `style.css` imports the shared tokens and components, so future pages can adopt the same design system. Include `components.js` before page-specific scripts to render the shared footer. The home simulator is a scripted, illustrative explanation; the working-solution form in `solution.html` continues to use Decision Policy v1.

### Add the problem video

At the top of `dist/home.js`, fill in the single `videoConfig` object: `videoSrc` (local MP4), `posterSrc` (poster image), `captionsSrc` (WebVTT captions), and `title` (accessible video title). When `videoSrc` is empty, the 16:9 designed placeholder appears. When the video and captions paths are set, the page renders a player with controls and no autoplay. Replace the placeholder text inside `#video-transcript` in `dist/index.html` with the finished transcript. The group brief requires a problem video of at least 15 seconds; this slot remains a placeholder until that video is supplied.

For a YouTube or Vimeo version, replace `#video-slot` with a responsive, titled `iframe` embed and keep the transcript area. Use the provider's privacy and caption controls, and do not enable autoplay with sound.

The wordmark is text-based. The home `Get Started` destination currently leads to the existing working-solution demo; replace that destination if the group chooses another action.
