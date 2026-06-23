# Romantasy Queen OS V5 — Infinite Knowledge Samsung PWA

A free, installable Samsung/Android web app for daily quests, training, wardrobe planning, mental reset tools, and an infinite Smart Scroll that discovers useful knowledge instead of repeating a fixed list.

## What changed in V5

Smart Scroll is now a knowledge universe, not just a small deck of cards.

Modes included:

- **Auto Universe mix** — rotates through public APIs and falls back to infinite offline generation.
- **New/useful GitHub repos** — finds recently active public repos that look useful for building, studying, dashboards, AI agents, productivity, data science, PWA tools, etc.
- **Research studies mix** — rotates through OpenAlex, Crossref, Europe PMC, and arXiv.
- **Old/public-domain books** — pulls classics and public-domain metadata via Gutendex / Project Gutenberg metadata.
- **Hacker News discoveries** — pulls top/new tech/startup/project discoveries.
- **StackExchange answers** — finds community Q&A for programming, data science, stats, literature, worldbuilding, etc.
- **Wikipedia / Wikimedia** — searches encyclopedia knowledge.
- **Open Library / Google Books** — book discovery.
- **Guardian / YouTube / Gemini** — optional API-key-powered sources.
- **Offline infinite** — generates new micro-lessons forever with no internet.

Every card ends with a tiny action so it stays intentional: summarize, verify, bookmark for a reason, prototype, write one note, or skip.

## Optional API vault

Keys/tokens are stored only in this browser's local storage on your phone. Do not paste paid/secret keys into a shared device.

Optional fields:

- Gemini API key: personalized generated knowledge cards.
- GitHub token: optional higher GitHub API limits for public repo searches.
- OpenAlex API key: optional scholarly API key if required or useful for your usage.
- Guardian API key: culture/books radar.
- YouTube Data API key: learning-video cards.
- Google Books API key: richer book discovery.

No-key/public sources still work: GitHub public search, OpenAlex basic queries, Crossref, Europe PMC, Gutendex, Hacker News Firebase API, Wikipedia/Wikimedia, Open Library, and offline generator.

## Install on Samsung

1. Upload this folder to a free static host such as Netlify Drop or GitHub Pages.
2. Open the live HTTPS link in Chrome or Samsung Internet.
3. Browser menu → Install app / Add page to Home screen.
4. Open the app from your Home Screen.
5. Settings → Enable app notifications.
6. Also import `queen_os_samsung_calendar_backup.ics` into Google Calendar for reliable reminders.

## Important limitations

- Exact background push notifications require a real push server. This app provides local notification timers and a calendar backup instead.
- Some public APIs can rate-limit or block browser requests depending on their rules/CORS. The app always falls back to another source or offline generation.
- GitHub/public repo cards are discovery cards, not endorsements. Read the README, check maintenance/security, and never run random code blindly.
- Research cards are metadata/discovery cards. Do not turn one paper into a life rule; verify, read critically, and prefer consensus for health/science decisions.
- Photos and progress are stored locally in the browser/app storage. If you clear browser storage, they can disappear. Use export backups.
