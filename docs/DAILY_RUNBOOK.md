# Complete English — Daily Publishing Runbook (v2)

Read COURSE_SPEC.md and course.config.json before creating any lesson. This runbook describes the scheduled execution and source-of-truth workflow.

## Repository structure

Repository: alextgtome/complete-english; publishing branch: develop.
- docs/COURSE_SPEC.md — canonical pedagogical and UI requirements.
- docs/DAILY_RUNBOOK.md — daily publishing procedure.
- course.config.json — machine-readable duration, start date, timing and historical exceptions.
- data/lessons.js — central JavaScript registry (window.CE_DATA), with G for chunk IDs and first use, days for lessons, F for foundations, focusDrills for daily substitution patterns, av and bv for reusable sequences.
- lessons/day-NNN.html — thin page for one day's lesson, referencing shared assets.
- assets/app.js and assets/site.css — shared rendering and interactivity.
- scripts/validate-lessons.mjs — automated checks.
- .github/workflows/pages.yml — validation **before** Pages deployment.

The root index is generated from data/lessons.js; do not add a redundant hardcoded list of days. The browser's localStorage is NOT synchronized with GitHub.

## Daily run (in order)

1. Compute Day N using the current **America/Sao_Paulo calendar date** and 2026-10-29. Do not publish outside days 1–150.
2. Through the authenticated GitHub connection, read COURSE_SPEC.md, this runbook, course.config.json, data/lessons.js, the prior seven days' records, current shared renderer and the proposed lessons/day-NNN.html.
3. **Idempotency first:** if today's HTML and registry entry exist, do not publish a duplicate. Verify and link the existing entry. If just one exists, investigate and repair the partial state carefully; never overwrite unrelated edits.
4. Check FULL chunk history: compare normalized spelling and semantic meaning; select exactly three genuinely new IDs, three spaced reviews with verified first-use days, a novel topic and one foundations skill. Keep last seven days' exercise themes varied, aside from planned spaced review.
5. Build one complete lesson obeying the 15 + 35 + 30 + 10 timing and both speaking routes. All six chunks include their own PT-BR translation and "Quando usar"; all other user-facing instructions are English.
6. Design exactly THREE cumulative substitution sequences. Each needs one natural base, 4–6 concrete cues and fully grammatical, coherent intermediate results. Change grammatical units together if needed; attach short note to linked changes. Simulate and **proofread every resulting sentence**, including agreement and idiomatic usage. Never "fix" an intentionally wrong intermediate model answer in the following cue.
7. Append to G three new chunk IDs with first-use day N, and add one record to days with six valid IDs, date, prompts, foundations and any day-specific fields needed by the renderer. Add focusDrills[N]. Preserve historical IDs, dates and first-use markers.
8. Add lessons/day-NNN.html using the neighboring thin template and referencing shared data and assets. Ensure the shared frontend can render this record; don't embed a second lesson copy in HTML.
9. Check everything locally if possible: node --check assets/app.js AND node scripts/validate-lessons.mjs. When only GitHub actions are available, confirm the Pages workflow validates before deployment. **Never skip a failing check** or claim success based on a commit alone.
10. Commit with authorized GitHub operations and verify the resulting file reads. Check Pages deployment status separately; only link the public URL as confirmed if its deployment succeeds. Otherwise link the GitHub file and explain the status.
11. Deliver a useful concise English lesson summary with the date, time blocks, three new and three review chunks (including their PT-BR translations and "Quando usar" cues) and a real link to the published lesson. Do not claim speaking/writing performance without samples.

## Failure policy and maintenance

- Can't read GitHub registry/spec? Do not assume new chunks are unprecedented; do not blindly publish or create duplicate lessons. Explain the obstacle, provide useful unverified learning material in chat if appropriate.
- Validator fails? Correct the SOURCE first. Do not disable the Pages quality gate to publish.
- Rerun on the same day? Return the existing day's content and no duplicate.
- Found a design bug? Fix the shared assets, not 150 separate lesson HTML files.
- Found a content bug? Fix the registry, add a regression check, run existing checks.
- Keep changes additive and auditable. Do not commit personal responses, notes, recordings, private data, credentials or secrets to this public repository.
- Changes to the pedagogical approach belong in COURSE_SPEC.md, not appended to the ChatGPT automation prompt. Only change the automation prompt to update its short reference or operating boundaries.
