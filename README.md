# Complete English — 150-day Fluency Lab

## Who is this for?

People who can understand a lot of English — sometimes even technical talks or books — but find it hard to retrieve natural phrases while speaking. That gap is not necessarily caused by anxiety or mental translation. Our focus is practical: **recognise → retrieve → substitute → speak → recover without restarting**.

This is a **free public learning experiment**, not a scientifically validated programme or a promise of fluency. The 150-day course originated as a personal English practice routine and is being adapted for other learners. Some lessons use engineering/IT situations; the new public starter focuses on everyday situations.

### Try it in 12 minutes

Start with the [interactive speaking demo](start.html) (published as [Start Here](https://alextgtome.github.io/complete-english/start.html) when GitHub Pages has deployed). It includes:
- three natural sentence chunks with concise Portuguese explanations;
- two cumulative substitution drills with every cue provided;
- a recovery exercise for continuing when you cannot remember a word.

Then try the [lesson archive](index.html) and use either ChatGPT Voice or your own phone recorder for speaking. No login or microphone permissions are needed on the site. Your typed practice and checkmarks stay in your own browser, not on a central server.

### Feedback and future contributors

Ideas and bug reports are welcome as [GitHub issues](https://github.com/alextgtome/complete-english/issues). Useful requests include alternative lesson themes (non-technical work, travel, everyday life), accessibility, mobile navigation, and exercises that improve spontaneous production.

**Development status:** early-stage. There is currently no formal open-source licence; the repository is public, but that alone does not grant permission to redistribute or commercially reuse the source. A licence can be selected separately.

Static HTML lessons originally started 29 October 2026, with 150 days ending 27 March 2027.

Open `index.html` or enable [GitHub Pages](https://docs.github.com/en/pages/quickstart): Settings → Pages → **GitHub Actions**. The included Pages workflow deploys from `develop` on push.

**Historical archive:** Days 1–16 were reconstructed as HTML study adaptations from the original printable worksheets. Existing lesson content and dates are respected; the modern 90-minute structure replaces early time allocations. The Day 7 and Day 12 NEW-label errors are corrected. Do not treat regenerated substitution drills as copies of the original pages.

**Daily routine:** 15 min foundations, 35 min chunks, 30 min speaking, 10 min writing.

**Privacy:** This is a public repository. Do not commit personal notes, audio recordings, credentials, or private data. Browser writing and completion states use localStorage; they do not synchronise across devices.

**Daily publishing:** Add a record to `data/lessons.js`, create `lessons/day-NNN.html` referencing existing assets, then commit to `develop`. Do not overwrite previous days.

## Pages publishing

This repository includes `.github/workflows/pages.yml`, configured to deploy the static site from the `develop` branch after each push. In GitHub repository Settings → Pages, select **GitHub Actions** as the build/deployment source. Then check **Actions → Publish Complete English site** for the deployment result. The site address is `https://alextgtome.github.io/complete-english/` once GitHub Pages reports a successful deployment.
