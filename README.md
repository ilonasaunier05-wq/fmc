# Romantasy Queen OS V6 — Real Smart Scroll Samsung PWA

A free, installable Samsung/Android web app that runs as a static site: HTML, CSS, JavaScript, localStorage, IndexedDB, service worker, and a calendar backup.

## Biggest V6 upgrade

Smart Scroll is now a real vertical feed instead of one small card box.

- Big phone-first cards that take most of the screen.
- Scroll naturally like a social feed.
- Auto-loads more cards when you near the bottom.
- “Load 10 cards” button for instant feed building.
- “Focus feed” mode hides the decorative parts and makes the feed feel more app-like.
- Each card has Save, Mark learned, Copy, and Open source actions.
- The visible feed is saved locally, so you can reopen the app and keep scrolling where you were.

## What is inside

- Daily quests with XP, streak, mood weather, and a 30-day progression.
- A real 4-week no-equipment workout plan with daily training, progressions, and low-energy swaps.
- Wardrobe photo import using local IndexedDB storage.
- Outfit oracle by vibe, category, and weather context.
- Optional Open-Meteo weather lookup using phone location.
- Real Smart Scroll knowledge feed:
  - GitHub repos
  - OpenAlex, Crossref, Europe PMC, arXiv studies
  - Project Gutenberg/Gutendex public-domain books
  - Hacker News discoveries
  - StackExchange answers
  - Wikipedia/Wikimedia
  - Open Library
  - optional Gemini, Guardian, YouTube, Google Books API keys
  - offline infinite generated cards when internet/API sources fail
- Free learning portal links.
- Inner Court Agents: copy-ready ChatGPT prompts for Aelin/Feyre/Poppy/Jude/style/learning.
- Book Radar with Open Library search and TBR tracker.
- App notifications where browser rules allow them.
- `queen_os_samsung_calendar_backup.ics` for reliable daily calendar reminders.
- Progress JSON export/import.

## Install on Samsung

1. Upload this folder to a free static host such as Netlify Drop or GitHub Pages.
2. Open the live HTTPS link in Chrome or Samsung Internet.
3. Browser menu → Install app / Add page to Home screen.
4. Open the app from the Home Screen.
5. Settings → Enable app notifications.
6. Also import `queen_os_samsung_calendar_backup.ics` into Google Calendar for reliable reminders.

## Important limitations

- Photos, API keys, and progress are stored locally in the browser/app storage. If you clear browser storage, they can disappear. Use export backups.
- Exact background push notifications require a real push server. This app provides local notification timers and a calendar backup instead.
- Public APIs can rate-limit or fail temporarily. Smart Scroll falls back to offline generation.
- Do not blindly run code from random GitHub repos. Read the README, issues, commits, and install instructions first.
- Research cards are discovery leads, not medical or life advice.

## No-equipment training safety

The workout plan is general wellness content, not medical advice. Stop if you feel sharp pain, dizziness, chest pain, or anything worrying. Use the low-energy swap when needed. Consistency beats punishment.
