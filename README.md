# Kaam Saathi — Work & Benefits Companion

A free, open-source web app for informal-sector workers in India. It helps a worker
keep a daily record of work and pay, see money that is still owed, and check which
government schemes they may be able to use.

Built for the **Code for a Billion Hackathon 2026** (Code for India),
**Challenge 09: Livelihood for the Uneducated** — skill matching, informal-sector
income, micro-entrepreneurship, benefits access.

- **Live app:** https://aminoragit.github.io/cfb-kaam-saathi/
- **Author:** Seok Won Choi (Choi Seokwon) — wjsxkxk1@gmail.com — GitHub: [@Aminoragit](https://github.com/Aminoragit)
- **Licence:** MIT (see `LICENSE`)

## The problem

More than 90% of India's workforce is informally employed (Periodic Labour Force
Survey / Economic Survey 2022–23) — street vendors, construction workers, domestic
workers, farm workers, gig and delivery workers, artisans. They have no payslips,
no employer records, and often no written proof of what they earned or what they
are still owed. At the same time, help exists but is hard to reach: 31.89 crore
workers had registered on the government's e-Shram portal by August 2026, yet only
about 54 lakh had enrolled in PM-SYM, the pension scheme for the same workforce
(Press Information Bureau, July–August 2026). Registration is not the same as
receiving a benefit.

Kaam Saathi closes the gap between daily work and the schemes meant for it. It
gives a worker a written record of their own, and turns their answers into a
plain-language check of six real schemes — with the next concrete step for each one.

## What it does

All features work in the browser, with no account and no server. Data is stored
only in the browser's local storage on the user's own device.

1. **Work log** — Add a day: date, kind of work, hours, pay agreed, pay received,
   who paid, a note. Edit or delete any day. Unpaid and partly-paid days are marked
   clearly.
2. **Money** — Totals for the month (agreed, received, still owed, days worked,
   average pay per day), a bar chart of pay received in the last 7 days, and a
   follow-up list (money owed, gaps in the record, unfinished scheme steps).
   Download the log as CSV, back it up as JSON, load a backup, or delete everything.
3. **Benefits check** — Answer ten short questions under "My details" (age, work,
   income band, bank account, Aadhaar, e-Shram status, EPFO/ESIC, income tax,
   artisan trade). The app checks six schemes and says, for each one, "Likely
   match", "Check", "Does not fit", or "Details needed", with the reason. Each
   scheme card lists what it gives, who can get it, the official site, and a
   tick-off checklist of the next steps.
4. **Skills & work** — Tick the skills you have. The app shows which kinds of work
   use them, and what a 6-day week would pay **at the daily rate you set yourself**.
   No pay rates are filled in for you.
5. **Sample week** — "Load a sample week" adds seven example days, clearly marked
   SAMPLE, so anyone can try the app without entering real data. One tap removes them.

## The six schemes (facts checked 10 November 2026)

| Scheme | What it gives | Who can get it | Official site |
|---|---|---|---|
| e-Shram | Free registration; 12-digit Universal Account Number (UAN) linking the worker to welfare schemes | Unorganised workers aged 16+, not EPFO/ESIC members, not income-tax payers | https://eshram.gov.in/ |
| PM-SYM | Assured pension of ₹3,000 a month after age 60; contribution ₹55–₹200 a month, matched by the government | Unorganised workers aged 18–40, monthly income ₹15,000 or less, not EPFO/ESIC/NPS members, not income-tax payers | https://maandhan.in/ |
| Ayushman Bharat PM-JAY | Hospital cover of ₹5 lakh per family per year, cashless at empanelled hospitals | Families on the SECC 2011 list; everyone aged 70 or above | https://pmjay.gov.in/ |
| PMSBY | ₹2 lakh for accidental death or full disability; ₹1 lakh for partial disability | Age 18–70, with a bank or post office account; premium ₹20 a year | https://jansuraksha.gov.in/ |
| PMJJBY | ₹2 lakh life cover on death from any cause | Entry age 18–50, with a bank or post office account; premium ₹436 a year | https://jansuraksha.gov.in/ |
| PM Vishwakarma | ₹15,000 toolkit incentive; collateral-free loans up to ₹1 lakh, then up to ₹2 lakh, at 5% interest | Artisans aged 18+ in one of 18 listed traditional trades, self-employed | https://pmvishwakarma.gov.in/ |

Notes on honesty in the app:

- PM-JAY eligibility follows the SECC 2011 list, which the app cannot look up. The
  app never claims a PM-JAY match except for age 70+, where cover applies to
  everyone. Otherwise it says "Check" and points to
  https://beneficiary.nha.gov.in/ or helpline 14555.
- Every figure above was checked against the official scheme page or a Press
  Information Bureau release on 10 November 2026. The same sources are listed in
  the app under Benefits → Sources.
- Scheme rules can change. The app tells the user to confirm on the official page
  or at a Common Service Centre (CSC) before paying anyone or handing over
  documents. e-Shram registration is free.

## How to run it

No build step, no server, no dependencies. It is plain HTML, CSS and JavaScript,
with no external requests at all — it works offline once loaded.

```sh
# Option 1: open the file
open docs/index.html

# Option 2: serve locally
python3 -m http.server --directory docs 8123
# then open http://localhost:8123/
```

## How it was tested

Tested end to end in headless Chromium (Playwright) against the local copy:
31 checks, all passing — profile save, all six scheme verdicts (including edge
cases: age 72 → PM-JAY match, PM-SYM does not fit; age 12 → e-Shram does not
fit), add/edit/delete log entries, sample week, monthly totals (₹4,400 agreed,
₹800 still owed in the test data), 7-day chart, skill matching with the user's
own rate (₹500/day → ₹3,000 for 6 days), CSV export, JSON backup and restore,
full wipe, localStorage persistence across reloads, zero external network
requests, zero console errors. Also checked at 390px width (no horizontal
overflow).

## Project layout

```
docs/
  index.html   — the whole app page
  styles.css   — styling, no external fonts
  app.js       — all logic (log, totals, checker, skills), localStorage only
LICENSE        — MIT
README.md      — this file
```

## Status

- Live on GitHub Pages (see link above).
- Demo video (2–3 minutes, real screen recording with captions):
  `video/kaam-saathi-demo.mp4` in the submission folder; upload step is with the
  entrant (see `SUBMISSION.md` in the project folder).
- Submission is made by the entrant through the GitHub structured form on
  https://codeforindia.org/hackathon — not by this repository.

## A note on the official IDE

The hackathon's official IDE is AgentFoundry.me. Signing up there needs the
entrant's own account, so this project was built with standard tooling instead
and is published here as a public repo with a live deployment, as the rules
require. The AgentFoundry step, and the final form submission, are for the
entrant to complete.
