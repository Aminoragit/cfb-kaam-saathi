# Submission — Kaam Saathi (Code for a Billion Hackathon 2026)

> **READY-FOR-CHATGPT-POLISH** — The text in "Form text" below is final and
> checked, but has not yet had the last polish pass in ChatGPT. Before submitting,
> run it through ChatGPT with the standing instruction (fix AI-sounding phrasing
> and readability, never change the facts or the form). Then paste it into the
> GitHub structured form. Nothing here has been submitted anywhere yet.

- **Entrant:** 최석원 (Seok Won Choi) — wjsxkxk1@gmail.com — GitHub: Aminoragit
- **Hackathon:** Code for a Billion — Bharat Agentic-AI Hackathon 2026 (Code for India)
- **Challenge:** #09 Livelihood for the Uneducated — skill matching, informal-sector
  income, micro-entrepreneurship, benefits access
- **Project:** Kaam Saathi — Work & Benefits Companion
- **Public repo:** https://github.com/Aminoragit/cfb-kaam-saathi
- **Live demo:** https://aminoragit.github.io/cfb-kaam-saathi/
- **Demo video:** `video/kaam-saathi-demo.mp4` (2 min 26 sec, real screen recording
  with captions, no narration) — also in the repo at `video/kaam-saathi-demo.mp4`
- **Licence:** MIT
- **Deadline:** submissions close 15 November 2026 (no time stated on the official
  page — treated as 15 November 23:59 IST, i.e. 16 November 03:29 KST)

## Problem statement

More than 90% of India's workforce is informally employed (Periodic Labour Force
Survey / Economic Survey 2022–23): street vendors, construction workers, domestic
workers, farm workers, gig and delivery workers, artisans. They have no payslips,
no employer records, and usually no written proof of what they earned or what they
are still owed. When pay is short or late, there is nothing to show for it.

Help exists, but it is hard to reach. By August 2026, 31.89 crore workers had
registered on the government's e-Shram portal — yet only about 54 lakh had enrolled
in PM-SYM, the pension scheme for the same workforce (Press Information Bureau,
July–August 2026). Registration is not the same as receiving a benefit. The gap is
not a lack of schemes; it is that a worker with little formal schooling has no
simple way to know which schemes fit them, what each one actually gives, and what
to do next.

## Solution

Kaam Saathi is a free web app that a worker opens in a browser — no account, no
app install, no server, no tracking. Everything is stored only in the browser on
the worker's own device, so it works offline once loaded and asks for no Aadhaar
number, bank detail or password.

It does four things:

1. **Daily work log.** The worker writes down each day: what work, how many hours,
   pay agreed, pay actually received, who paid, a note. Days can be edited or
   deleted. Unpaid and partly-paid days are marked, so missing pay is visible.
2. **Money.** Monthly totals (agreed, received, still owed, days worked, average
   pay per day), a bar chart of pay received in the last 7 days, and a follow-up
   list: money owed, gaps in the record, unfinished scheme steps. The log downloads
   as CSV; a JSON backup can be saved and loaded back; one tap deletes everything.
3. **Benefits check.** Ten short questions (age, work, income band, bank account,
   Aadhaar, e-Shram status, EPFO/ESIC, income tax, artisan trade) are checked
   against six real schemes — e-Shram, PM-SYM, Ayushman Bharat PM-JAY, PMSBY,
   PMJJBY, PM Vishwakarma. Each scheme says "Likely match", "Check", "Does not
   fit" or "Details needed", with the reason, what it gives, who can get it, the
   official site, and a tick-off checklist of the next steps.
4. **Skills & work.** The worker ticks the skills they have. The app shows which
   kinds of work use those skills, and what a 6-day week would pay at the daily
   rate the worker sets themselves. No pay rates are filled in for the worker.

Every scheme fact in the app was checked against its official page on
10 November 2026 and is listed with its source in the app (Benefits → Sources).
Where the app cannot know the answer — PM-JAY eligibility follows the SECC 2011
list, which no app can look up — it says so plainly and points to the official
check instead of guessing.

## How it was tested

39 automated end-to-end checks in headless Chromium (Playwright), all passing:
profile save; all six scheme verdicts, including edge cases (age 72 → PM-JAY
match, PM-SYM does not fit; age 12 → e-Shram does not fit); add/edit/delete log
entries; sample week; monthly totals; 7-day chart; skill matching with the user's
own rate; CSV export; JSON backup, wipe and restore; invalid input rejected;
localStorage persistence across reloads; zero external network requests; zero
console errors. Also checked at 390px width (no horizontal overflow). The demo
video is a real recording of the live app, not staged stills.

## Judging criteria — how this entry maps to them

| Criterion (25% each) | How Kaam Saathi answers it |
|---|---|
| **Size of the problem** | More than 90% of India's workforce is informally employed (PLFS / Economic Survey 2022–23). e-Shram alone has 31.89 crore registrations. The app is built for that whole group, not one trade or one city. |
| **Severity of the problem** | No written record means unpaid wages cannot be shown or chased, and a missed scheme means no pension, no accident cover, no hospital cover. PM-SYM enrolment of ~54 lakh against 31.89 crore e-Shram registrations shows how much protection is going unclaimed. |
| **Quality of the solution** | It works in a browser with no account, no server and no data leaving the device; every button does something real; every scheme fact is sourced; the checker refuses to guess where it cannot know (PM-JAY). Plain words, large text, usable on a cheap phone. |
| **Proven impact** | Deployed live on GitHub Pages and tested end to end (39/39 checks). Real usage data does not exist yet — the app is new, and the submission says so rather than inventing users. The design makes impact measurable from day one: days logged, money marked owed, checklist steps completed are all counted from real entries, not estimates. |

## What is still open (for the entrant, not the judges)

- ChatGPT polish pass on this text, the README and the video captions (flagged above).
- Upload the demo video to YouTube as unlisted (or submit with the live link only —
  the rules allow a live link instead of a video).
- Sign up on AgentFoundry.me (the official IDE) with the entrant's own account and
  create the project there, as the rules describe.
- Submit through the GitHub structured form linked from
  https://codeforindia.org/hackathon before the deadline.
