# Decision Policy v1
Use for the Everyday Access synthetic transaction demo.
Input: amount 1–10000, network risk 0–100, familiar merchant, recognized device, supported wallet (boolean).
Validate first. Add 15 for unfamiliar merchant, 20 for new device, 15 for amount >=500; cap at 100.
Below 35 approve, 35–69 verify, 70+ block. Verification yes approves; no blocks.
Offer simulated digital access only after blocking and only for supported wallets; otherwise show assisted recovery.
Never imply real authorization, trained AI, or actual card issuance. Never collect personal or card information.
Implementation: dist/app.js evaluate, confirm, recover. This project-level policy is used directly by the demo.
