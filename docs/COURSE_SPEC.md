# Complete English — Course Specification (v2)

This is the canonical, versioned teaching specification. It replaces the accumulation of rules inside the daily ChatGPT automation. See DAILY_RUNBOOK.md, course.config.json and data/lessons.js.

## Purpose and positioning

Complete English is a free public learning **experiment**, not a certified course or proven learning method. The author is a software engineer, not an English teacher. Exercises aim to help learners who can understand English but need practice retrieving, connecting and using expressions spontaneously.

The main challenge being addressed is retrieval **in the middle of a sentence**, not necessarily anxiety or mental translation. Never invent learner performance, pronunciation errors, metrics, professional experience or achievements. Mix everyday life with real-world professional and occasional technical scenarios. Do not publish confidential work details, personal records, medical or family information.

## Identity and schedule

- Start date / Day 1: 2026-10-29 in America/Sao_Paulo.
- Day N = 1 + local calendar-day difference from start date.
- Duration: 150 days, ending 2027-03-27.
- This project publishes HTML, never PDF. Do not renumber old days, duplicate lessons or add mandatory homework.

## Language, presentation and accessibility

Write **all** lesson titles, explanations, directions, answers, feedback and delivery messages **in English**. Exception: each of the **six target chunks** includes a concise, natural PT-BR translation and an explicit PT-BR **"Quando usar:"** situational cue. Both are required in the lesson and any message summarizing the chunks.

Use readable responsive HTML with headings, spacing, keyboard-compatible controls and **hidden answers until attempted**. The website may locally store checkmarks and notes; never claim this synchronizes between devices or uploads audio.

## Exactly 90 minutes — four required blocks

### 1. Forgotten Foundations (15 minutes)

Rotate one daily micro-skill: letters/spelling, numbers (100 to billions), money/percentages, dates/time, prepositions, functional tenses, question formation, articles, small talk. Give a short explanation, **6–10 exercises** and a hidden answer key.

Within those SAME 15 minutes, include 8–12 **Everyday Reflex** cue/answer interactions, with hidden replies. Mix thanks vs you're welcome, you too, apologies, requesting help, shopping, cashier, neighbor and work exchanges; practise both speaker roles.

### 2. Natural Chunks (35 minutes)

Choose **exactly three truly NEW + three REVIEW** chunks. Check normalized forms and meaning against **the full cumulative GitHub registry**; reviews must reference the true day of first appearance. Aim for spaced repetition from 1, 3 and 7 days ago where available.

Each target: English phrase, concise PT-BR translation, specific PT-BR "Quando usar" cue, English meaning, grammatical template or collocation warning, **two contrasting examples** (daily and professional/technical when natural). Do not misrepresent a previously learned variant as new.

Five timed parts, total 35 minutes:
1. Noticing (5m): contextual paragraph, understand patterns.
2. Guided cumulative substitution (10m): **three** complete series, each with a natural base sentence and **4–6 explicit transformation cues**. The learner says every entire resulting sentence before revealing an answer; cumulative cues change the preceding sentence.
3. Real practice (10m): short spontaneous story/dialogue using two suitable chunks.
4. Fast retrieval (5m): hide cards, retrieve target expressions, fill three gaps and create three original phrases.
5. Mid-sentence recovery (5m): keep the idea moving without restarting; paraphrase with options such as "What I mean is...", "Let me put it another way..." or "The point is...".

**CRITICAL GRAMMAR CONTRACT:** EVERY intermediate model answer in a normal substitution drill must be grammatical, idiomatic and coherent. Never intentionally output an incorrect step and repair it in the next. When a substitution changes subject–verb agreement or other dependent grammar, use **one coherent grammatical unit** (e.g. "The team checks" -> "Our engineers check") and a visible note explaining why the subject and verb change together. Only create wrong sentences in a separately labelled error-correction activity, not here.

Before publishing, simulate EVERY cue against the prior sentence and proofread EVERY result for agreement, tense, article, modal, preposition, collocation, logical fit and word order. String-replacement checks are necessary but **not sufficient**.

### 3. Spontaneous Speaking (30 minutes)

On normal days: 10m everyday small talk + 15m professional/everyday role-play + 5m progressive recap 60s, 45s, 30s (concise, never rushed).

Interview day when N % 7 = 1 or 4: 10m small talk + 15m alternating behavioral/technical interview + 3m feedback (at most three important corrections actually observed) + 2m retry; **do not add 3–2–1**.

Provide TWO clearly separate responsive cards:
- **Option A · AI Voice partner:** three concise steps; copy a **complete, self-contained, lesson-specific prompt**, paste into ANY voice-enabled AI assistant (e.g. ChatGPT, Gemini or Claude **when supported**), then start voice mode in that same conversation. One button: "Copy coaching prompt". Full prompt lives inside a collapsed "Preview or manually copy the prompt" with readonly selectable text. It includes the actual day, date, theme, all six chunks, initial small-talk question, scenario, timing, and clear instructions: ask **only one question at a time**, wait for real learner answers, adapt follow-ups, encourage paraphrase/retry, and never invent scores, pronunciation findings or user experiences. **The HTML site cannot start an AI voice session or listen to the user.** Provider availability varies.
- **Option B · Solo recorder:** at least three specific prompt cards; read, hide, record for 60–120 seconds, listen, identify one unclear thought and one unnatural expression, and retry. Working 60/45/30 timer and appropriate concluding speaking exercise.

### 4. Writing and Consolidation (10 minutes)

Essential version: 2–4 sentences and rewrite one sentence using a chunk. If time remains within the same block, optional expansion to 4–8 sentences and second rewrite. Keep model corrections hidden until attempted. Dictation then editing is fine. If skipped, record it as pending.

## Completion and pedagogy

- Interactive checklist and browser-only writing field.
- Two genuine review sentences from the immediately preceding lesson when available.
- Display the three new chunks and three reviews, with verified first-use days. Compute cumulative distinct count ONLY from verified registry.
- Weekly checkpoint every seventh day: recognized vs spontaneously spoken chunks, prepositions and three variations. Never invent learner performance.
- Optional transcript-supported shadowing (10–15m) is OUTSIDE the 90 minutes.
- Progression: weeks 1–2 reflex/foundations, 3–6 narration/chunks, 7–10 trade-offs/system design, 11–14 behavioral interviews, 15–21+ simulations/retrieval. Do not let themes override daily timing or variety.

## Historical integrity

Days 1–16 are HTML adaptations of earlier printable worksheets, not verbatim source reproduction.
- Day 1 introduced seven NEW expressions.
- Day 7 introduced only one genuinely NEW expression.
- Day 12 introduced two genuinely NEW expressions (another had appeared Day 9).
The strict modern rule 3 NEW + 3 REVIEW is mandatory from **Day 17** onward. Never silently change historical first-use days or invent old exercise content.

## Quality and operational contract

Use DAILY_RUNBOOK.md. Canonical daily state is data/lessons.js plus its linked lesson HTML. Do not claim a lesson is published without verifying GitHub commits and files; verify GitHub Pages availability separately. The automated validator catches structural and some obvious grammar errors; **editorial linguistic review is still mandatory**. The public repository must never store private audio, learner notes, performance data, secrets or medical/family records.
