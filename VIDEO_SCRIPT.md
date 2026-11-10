# Demo video script — Kaam Saathi

> **READY-FOR-CHATGPT-POLISH** — The captions below are final and checked, but
> have not yet had the last polish pass in ChatGPT. Before any re-edit, run them
> through ChatGPT with the standing instruction (fix AI-sounding phrasing and
> readability, never change the facts). The video itself is already finished and
> does not need to be re-recorded for a wording polish unless the captions change.

- **File:** `video/kaam-saathi-demo.mp4`
- **Length:** 2 min 26 sec (146.4 s) — inside the required 2–3 minutes
- **Format:** 1280×720, H.264 mp4, no audio track
- **Narration:** none. No free text-to-speech voice was available on the machine
  without sign-in or payment, so the video uses burned-in captions only.
- **Footage:** a real screen recording of the app running in headless Chromium
  (Playwright), driven by real clicks and typing — no staged stills, no fabricated
  footage. Recorded against a local copy of the exact files deployed to GitHub
  Pages (all three files verified byte-identical to the live site; the sandbox
  proxy blocks the scripted browser from reaching github.io directly, while the
  live URL itself returns HTTP 200).

## Captions (in order, with timings)

| Time | Caption (as burned in) | What is on screen |
|---|---|---|
| 0:01–0:16 | Kaam Saathi — a work and benefits companion for informal-sector workers in India. | The app opens on the empty Work log tab. |
| 0:16–0:30 | First, the worker answers ten short questions. Nothing leaves this browser. | My details: age 34, construction work, income under ₹10,000, bank yes, Aadhaar yes, e-Shram no, no EPFO/ESIC, no income tax, not an artisan trade. Saved. |
| 0:30–0:50 | The app checks six real government schemes and shows which ones may fit. | Benefits tab: scheme cards with verdicts (e-Shram, PM-SYM, PM-JAY, PMSBY, PMJJBY, PM Vishwakarma). |
| 0:50–1:10 | Each scheme lists what it gives, who can get it, and the next step — with a tick-off checklist. | Scrolling the scheme cards; two e-Shram checklist steps ticked; Sources list shown. |
| 1:10–1:23 | Each day's work and pay is saved. Unpaid money is marked clearly. | A day is added: 8 hours, ₹600 agreed, ₹400 received — marked "Partly paid", ₹200 still owed. |
| 1:23–1:37 | A sample week shows how the log works. The whole log downloads as a CSV file. | "Load a sample week" adds 7 marked SAMPLE days; CSV download runs. |
| 1:37–1:53 | Money adds up what was agreed, what arrived, and what is still owed. | Money tab: monthly totals, 7-day bar chart, follow-up list. |
| 1:53–2:09 | Skills point to matching work, using the worker's own daily rate. | Skills tab: "Carpentry / wood work" ticked; rate ₹500/day set; 6 days = ₹3,000 shown. |
| 2:09–2:26 | All data stays on the device. Free and open source — MIT licence. | Sample entries removed; back to a clean log. |

## Verification

- `ffprobe` duration: 146.4 s; size 3.4 MB.
- Frames spot-checked at 0:05, 0:20, 0:40, 1:15, 1:30, 1:45, 2:00, 2:15 — captions
  readable, footage shows the real app at each step, figures on screen match the
  actions (e.g. chart bars ₹600/₹400/₹450/₹400/₹600/₹550/₹400; "Received in the
  last 7 days ₹3,400").
