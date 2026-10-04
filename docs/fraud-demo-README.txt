DEBIT CARD FRAUD PREVENTION DEMO
================================

This package contains one dependency-free web page and 100 synthetic debit-card
transactions. It does not contain real customer or banking information.

VIEWING THE DEMO
----------------

The page loads its CSV data through the browser, so serve this folder locally
instead of double-clicking solution.html.

Option 1 — Python

1. Check out this branch and open the dist folder.
2. Open PowerShell or Terminal in the extracted debit-card-fraud-demo folder.
3. Run one of these commands:

   python -m http.server 8000

   or, on some Windows installations:

   py -m http.server 8000

4. Open http://127.0.0.1:8000/solution.html in a browser.
5. Press Ctrl+C in the terminal when finished.

Option 2 — Visual Studio Code

Open the extracted folder and serve solution.html with an installed local-server
extension such as Live Server.

PACKAGE CONTENTS
----------------

solution.html                         Page structure
fraud-base.css                          Shared Everyday Access styling
fraud-demo.css                     Demo-specific responsive styling
fraud-engine.js                    Risk scoring and metrics engine
fraud-demo.js                      Page interactions and CSV loading
sample_debit_card_transactions.csv Synthetic demonstration data

IMPORTANT
---------

This is an educational demonstration, not a production payment authorization
system. Results are based on synthetic transactions and do not predict
production fraud performance.
