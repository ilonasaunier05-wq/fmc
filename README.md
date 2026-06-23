# Romantasy Queen OS V4 — Infinite Smart Scroll

This is the Samsung-friendly installable web app version of the Romantasy Queen OS.

## What changed in V4

- Smart Scroll is now effectively endless.
- It generates offline cards forever using rotating topics, concepts, vibes, and quests.
- It can also pull online inspiration from no-key public sources:
  - Wikipedia/Wikimedia
  - Open Library
- Optional API Vault for free API keys:
  - Gemini API: personalized AI-generated learning cards
  - Guardian Open Platform: book/fantasy culture articles
  - YouTube Data API: learning video discovery
  - Google Books API: richer book discovery
- API keys are stored locally in your browser storage on your phone.

## Samsung setup

1. Upload this folder to a free static host such as Netlify Drop or GitHub Pages.
2. Open the hosted HTTPS link on Samsung Internet or Chrome.
3. Use the browser menu and choose Install app / Add to Home screen.
4. Open from your Home Screen.
5. Go to Settings → API Vault if you want to add free keys.
6. Go to Smart Scroll → choose Auto mix or a specific source.

## Important about keys

This is a static app. It has no backend server, so keys are stored locally in your phone browser. Do not hard-code keys into the files before hosting, and do not use paid/secret production keys here. Create free restricted keys when the provider allows restrictions.

## Recommended source setup

- Start with no keys. The app works offline forever.
- Add Gemini if you want personalized AI cards.
- Add Guardian if you want book-news cards.
- Add YouTube only if you want video discovery; YouTube search uses quota.
- Add Google Books for richer book cards.

