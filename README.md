# Website Requirements

Build a website with **exactly five pages** that explains a business problem, demonstrates a working solution, markets its value, documents Skill/MCP contributions, and guides users.

## Required Pages

### 1. Home: The Problem and Why It Matters

- Explain the problem, who experiences it, and why it matters.
- Introduce the team's proposed solution.
- Embed a **Problem Video of at least 8 seconds** showing a user or customer experiencing the problem.

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
- The finished Problem Video must be **at least 8 seconds long**; the Marketing Video must be **at least 15 seconds long**. Multiple shorter clips may be edited together.
- Videos from **Week 6 may be reused**.

## Completion Checklist

- [ ] Exactly five pages, covering all required page purposes.
- [ ] Useful business-related content and working navigation on every page.
- [ ] Home explains the problem, affected users, importance, and proposed solution.
- [ ] Embedded Problem Video shows the problem and runs at least 8 seconds.
- [ ] Main workflow functions from user input to a useful result.
- [ ] Business Solution Skill/MCP materially contributes to that workflow.
- [ ] Marketing page sells customer benefits with a clear headline and concise explanation.
- [ ] Embedded Marketing Video communicates value and runs at least 15 seconds.
- [ ] Three Skills/MCPs have distinct roles and meaningful interaction evidence.
- [ ] Usage instructions are clear enough for another person to follow.
- [ ] Expected impact is supported by evidence or labeled estimates.
- [ ] Limitations, assumptions, and a realistic next improvement are stated.

## Home page on the `home-problem` branch

This branch contains the Home page. Open `dist/index.html` directly in a browser; it needs no build step. `dist/tokens.css` holds shared colors, type, spacing, and motion values; `dist/components.css` holds the navigation, buttons, panels, and footer; `dist/home.css` contains the Home layout; and `dist/home.js` controls the mobile menu and video slot. The older `dist/style.css` and `dist/app.js` are retained for team integration.

The problem video is still in progress. Its 16:9 placeholder is intentional. When an MP4 of at least 8 seconds, a poster image, and WebVTT captions are ready, fill in the `videoConfig` object at the top of `dist/home.js`. Then replace the placeholder summary in `#video-transcript` with the finished transcript. The player uses controls and does not autoplay.

The logo is a text wordmark. The page calls to action link to sections on this page, so this branch works on its own while the rest of the site is developed.
