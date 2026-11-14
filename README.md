# Complete English — 150-day Fluency Lab

Static HTML lessons originally started 29 October 2026, with 150 days ending 27 March 2027.

Open `index.html` or enable [GitHub Pages](https://docs.github.com/en/pages/quickstart): Settings → Pages → Deploy from branch → `develop` → `/(root)`; alternatively the included Pages workflow deploys from `develop` on push.

**Historical archive:** Days 1–16 were reconstructed as HTML study adaptations from the original printable worksheets. Existing lesson content and dates are respected; the modern 90-minute structure replaces early time allocations. The Day 7 and Day 12 NEW-label errors are corrected. Do not treat regenerated substitution drills as copies of the original pages.

**Daily routine:** 15 min foundations, 35 min chunks, 30 min speaking, 10 min writing.

**Privacy:** This is a public repository. Do not commit personal notes, audio recordings, credentials, or private data. Browser writing and completion states use localStorage; they do not synchronise across devices.

**Daily publishing:** Add a record to `data/lessons.js`, create `lessons/day-NNN.html` referencing existing assets, then commit to `develop`. Do not overwrite previous days.

## Pages publishing

This repository includes `.github/workflows/pages.yml`, configured to deploy the static site from the `develop` branch after each push. In GitHub repository Settings → Pages, select **GitHub Actions** as the build/deployment source. Then check **Actions → Publish Complete English site** for the deployment result. The site address is `https://alextgtome.github.io/complete-english/` once GitHub Pages reports a successful deployment.
