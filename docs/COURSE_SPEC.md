# Complete English — Course Specification (v2)

This is the canonical, versioned teaching specification. It replaces the accumulation of rules inside the daily ChatGPT automation. See DAILY_RUNBOOK.md, course.config.json and data/lessons.js.

## Purpose and positioning

Complete English is a free public learning **experiment**, not a certified course or proven learning method. The author is a software engineer, not an English teacher. Exercises aim to help learners who can understand English but need practice retrieving, connecting and using expressions spontaneously.

The main challenge being addressed is retrieval **in the middle of a sentence**, not necessarily anxiety or mental translation. Never invent learner performance, pronunciation errors, metrics, professional experience or achievements. Mix everyday life with real-world professional and occasional technical scenarios. Do not publish confidential work details, personal records, medical or family information.

## Everyday-life fluency and spontaneous idea generation

**Balanced fluency: everyday English + real workplace English + interviews.** This is neither a professional-only course nor a generic social-English-only course. From Day 18 onward, divide each seven-day cycle's **15-minute main speaking scenarios** as follows:
- **3 Everyday scenarios** (N % 7 = 0, 3, 6): personal routines, spontaneous plans, shopping, social conversation and common situations outside a technical meeting.
- **2 Workplace / Engineering scenarios** (N % 7 = 2, 5): real software-engineering communication **on the job**, not just technical interview questions.
- **2 Interview scenarios** (N % 7 = 1, 4): alternate technical/system design with behavioural/career storytelling.
Every day, **including Workplace and Interview days**, begins with a separate **10-minute non-technical small-talk block**. These ratios apply to the 15-minute scenario segments, not the full 90-minute lesson: foundations and chunks can include both everyday and technical contrasts on any day. Do not remove or dilute technical communication.

**Workplace English must be concrete and varied**. Repeatedly practise explaining an AWS deployment / release / rollback, choosing between Lambda, ECS or EKS when requirements justify it, clarifying which cloud service to provision, discussing API contracts and versioning, integration boundaries, queue/message design, incident mitigation, monitoring, code reviews, testing, CI/CD pipelines, team meetings, technical trade-offs and decisions. Choose one coherent context per workplace day, ask realistic follow-ups, and require the learner to justify trade-offs clearly rather than merely name services. Include communication functions such as asking for clarification, pushing back politely, giving progress updates and proposing next steps. Avoid inventing personal employment achievements or assuming specific infrastructure is deployed.

**Social English inside work is equally important:** colleagues and recruiters can ask about weekend plans, family, hobbies or a holiday. Treat that as everyday small talk, not a technical response.

Rotate non-technical contexts: weekends (including no plans yet), family, food, cooking, shopping, errands, invitations, weather, neighbours, entertainment, hobbies, travel, public transport, appointments, opinions, daily routines, leisure and friendly social exchanges. Change people, situations and question framing frequently; avoid the same 'neighbour' or 'colleague' opener each day. Sometimes include *casual social conversation with a recruiter* before an interview; the challenge is still ordinary language.

**Train the missing step: forming an idea before expressing it.** On each day, within the existing 10-minute small-talk section, ask at least one **unexpected, low-pressure, non-technical question**. Allow a moment to think, then practise **short honest answer → one simple detail → optional return question**. "I haven't decided yet", "No plans so far", and "I might take it easy" are valid starting answers. The learner never needs to fabricate a weekend plan, achievement or interesting personal story to make conversation.

If they cannot think of an idea, offer two or three **categories**, not a complete answer (e.g. resting, household errands, family time). First accept one truthful sentence; then ask for one detail. Practise changing subjects quickly: 3–5 unrelated ordinary-life questions as part of the existing reflex or speaking block, with hidden model answers and gentle retries. The objective is recovering and continuing after a blank, **not** speaking faster or appearing impressive.

This **balanced** emphasis applies **prospectively from Day 18**; do not rewrite the recorded historical lessons to pretend the original course had this balance. Each new lesson record must include `scenario_type` (`everyday`, `workplace`, or `interview`) matching the rotation and verified by automated tests.

## Figurative language and tolerance of ambiguity (from Day 18)

Teach **metaphor** (noun), **metaphorical** (adjective), **figurative language** (general category) and the distinction between literal meaning and context-dependent meaning. Also practise *tolerance of ambiguity*: learners should be able to understand the overall message even if one expression is unfamiliar. This does **not** mean guessing recklessly when the unknown term controls a safety-critical or decisive technical requirement; in that case, clarify.

**Daily micro-practice (within the existing five-minute Noticing block, NOT extra minutes):** For every Day N >= 18, include one `ambiguity` exercise in the day record with six nonempty fields:
- `sentence`: one natural contextual sentence, mixing daily-life, workplace and interview topics across the week;
- `expression`: the unfamiliar or figurative expression encountered;
- `gist_question`: one question about the *entire sentence*, answerable without a precise dictionary definition;
- `plain_english`: the expression's approximate meaning in simpler English;
- `context_clue`: which nearby words help infer the meaning, and what degree of uncertainty remains;
- `gist_answer`: a plain-English answer to the overall comprehension question.

On the website, show the sentence and gist question **before** a collapsible meaning/explanation. Learners should: **read through → infer a rough meaning → answer the gist → reveal → continue**. They can use surrounding words first and skip the unfamiliar expression temporarily if its exact meaning is unnecessary. Keep this short (~60–90 seconds inside Noticing). Do not automatically translate every unfamiliar word into Portuguese, interrupt the speaking flow, or present model answers before an attempt. In voice practice, accept approximations and encourage asking for clarification when the missing piece is essential.

**Dedicated metaphor lesson:** Set **Day 19 (2026-11-16)** as a workplace-scenario lesson on **"Metaphors and meaning in everyday and technical English"**. Teach the concepts explicitly in the existing 15-minute foundations rotation or 5-minute Noticing block (no extra time), with familiar-word/new-meaning examples such as *grounded in current information*, *on the same page*, *a bottleneck*, *under the hood*, *at the root of the issue*, alongside plain-English paraphrases. Contrast literal and figurative readings; show how to decide the intended meaning from context. Select any three NEW registered chunks only after verifying no prior appearance; metaphor terminology and example phrases **do not automatically count** as all three NEW chunks. The 15-minute main speaking scenario must remain **Workplace / Engineering**, consistent with the 3+2+2 rotation. If Day 19 has already been committed before this change is executed, preserve it and schedule the full metaphor lesson for the next available Workplace day instead of overwriting history.

**Spaced follow-up:** On Days 26 and 33 (workplace days), revisit metaphorical meanings and ambiguity recovery using fresh sentences, without repeating the exact examples.

**Recurring focused lessons, not a one-off:** After the Day 19 introduction, teach a deeper figurative-language / metaphor lesson **every 28 days**, on Days **47, 75, 103 and 131**, inside the existing Workplace rotation. Each edition must be different: introduce/contrast new contexts and figurative uses; revisit literal-versus-figurative interpretation and paraphrasing, but do not recycle the same exercises or count old chunks as NEW. Suggestions: Day 47 conversational metaphors and common idioms; Day 75 architecture metaphors and bottlenecks; Day 103 business discussion, priorities and trade-offs; Day 131 natural paraphrasing and comprehension under uncertainty. Follow normal time allocations (15+35+30+10), including 15-minute workplace engineering conversation and 10-minute everyday small talk. These are focused *themes*, not extra lessons or extra homework. Every other day still gets a short contextual-meaning exercise embedded in Noticing; that daily micro-practice should cover a mix of metaphors, polysemy, idioms, phrasal verbs and other tricky contextual meanings, rather than repeating just "grounded in".

**If a planned focus day already exists:** preserve the published record and place the deeper lesson in the next available future Workplace slot; do not silently overwrite past material. Recheck the 3+2+2 scenario distribution. Track actual first-use chunks in the canonical registry; do not fabricate new first appearances.

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

On non-interview days: 10m everyday small talk (surprise questions + honest answer/detail/return scaffold) + 15m **scenario of the day's type (Everyday or Workplace/Engineering)** + 5m progressive recap 60s, 45s, 30s (concise, never rushed). The 3 Everyday and 2 Workplace sessions per cycle are both required; never replace workplace practice with additional social-only drills.

Interview day when N % 7 = 1 or 4: 10m **non-technical recruiter small talk**, including honest answers about normal life + 15m alternating behavioral/technical interview + 3m feedback (at most three important corrections actually observed) + 2m retry; **do not add 3–2–1**.

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

Use DAILY_RUNBOOK.md. Canonical daily state is data/lessons.js plus its linked lesson HTML. **The tiny data/lesson-manifest.json and per-type `data/lesson-records/<type>/day-NNN.json` snapshots are derived from the canonical registry**, to provide a cheap existence check and standalone day metadata without reading the archive. `data/generation-index.json` remains a separate compact chunk-history planning view. These are cache-like derived artifacts, NOT additional canonical sources; regenerate and check both generators whenever the registry changes. Historic lesson classification is based on the actual scenario, not the later weekly rotation. Do not claim a lesson is published without verifying GitHub commits and files; verify GitHub Pages availability separately. The automated validator catches structural and some obvious grammar errors; **editorial linguistic review is still mandatory**. The public repository must never store private audio, learner notes, performance data, secrets or medical/family records.
