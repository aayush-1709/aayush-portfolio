# Aayush Sinha — Portfolio

Personal portfolio for an AI/ML & Generative AI engineer. React 19 + Vite + Tailwind CSS, with a Firestore-backed contact form.

## Features

**Futuristic layer** (all of it can be switched off with one toggle in the navbar's settings menu)
- Neural-network hero canvas that reacts to the cursor; ambient aurora, glass cards, mouse-following spotlight, HUD corner brackets, faint scanlines
- Boot sequence on first visit per session (any key skips), live status ticker with a New Delhi clock
- Text-decode headings, count-up stats, glowing cursor trail, magnetic buttons
- Four themes (Aurora, Cyber, Matrix, Mono) on top of dark/light, saved per browser
- Interactive 3D skill constellation (perspective-projected on a 2D canvas, no WebGL or extra dependency): drag to rotate
- Scroll-drawn experience timeline
- Optional UI sounds (WebAudio, off by default)

**Interactive tools**
- Terminal (`` ` `` key, navbar, or palette): `help`, `ls`, `cat`, `open`, `theme`, `ask`, `neofetch`, `stats` and `git log` (live from GitHub), Tab-complete, history
- Command palette (`Ctrl/Cmd + K`)
- Voice control (mic button; Chrome/Edge/Safari): say "projects", "dark mode", "cyber theme", "open terminal"
- Project finder: TF-IDF + cosine-similarity search over the projects, computed in the browser, with an explanation of the ranking
- "Ask Aayush" chat: local keyword answers by default; LLM-backed if you deploy `api/chat.js` (see below)

**Fundamentals**
- Single-page layout: Home, About, Experience, Projects, Skills, Contact (+ Testimonials once added)
- Project case-study modals (keyboard accessible, focus-trapped), category filters, auto-discovered screenshots
- Live "Latest on GitHub" repos via the public GitHub API (cached for an hour, hides itself on failure)
- About: your story plus a "road so far" milestone timeline (`src/data/journey.js`)
- 3D tilt on project cards
- Contact form to Firestore, with validation and a honeypot
- Optional, privacy-respecting Firebase Analytics (off unless configured)
- JSON-LD `Person` schema, OG/Twitter tags, `robots.txt`; set `VITE_SITE_URL` to also get canonical/og:url, absolute share-image URLs and a sitemap
- Honors `prefers-reduced-motion`: effects start off for those users

## Getting started

```bash
npm install
cp .env.example .env   # add your Firebase web config
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | ESLint |

CI (`.github/workflows/ci.yml`) runs lint and build on every push and pull request.

## Editing content

| To change… | Edit |
| --- | --- |
| Name, email, social links, resume URL, booking link, testimonials | `src/data/site.js` |
| About milestones | `src/data/journey.js` (the story text is in `src/pages/AboutPage.jsx`) |
| Projects (text, metrics, tech, links) | `src/data/projects.js` |
| Project images | Drop files in `src/assets/<project-folder>/` — `logo.png` is the card logo, any other image appears in the gallery |
| What the "Ask Aayush" assistant and the terminal know | `src/data/knowledge.js` |
| Skills (also feeds the 3D constellation) | `src/data/skills.js` |
| Theme palettes | `src/themes.css` (generated; each theme remaps the indigo/violet/fuchsia scales) |
| Experience / skills / achievements | `src/pages/ExperiencePage.jsx`, `SkillsPage.jsx`, `AboutPage.jsx` |

- **Testimonials:** add `{ quote, name, role }` entries to `TESTIMONIALS` and the section appears automatically.
- **Booking link:** set `BOOKING_URL` to a Calendly/Cal.com URL to show a "Book a call" button.
- **Analytics:** set `VITE_FIREBASE_MEASUREMENT_ID` to enable it.

## Optional: LLM-backed chat

`api/chat.js` is a Vercel-style serverless function that proxies "Ask Aayush" to the Anthropic API so the key stays on the server.

1. Deploy the project (the `api/` folder is picked up automatically on Vercel).
2. Set `ANTHROPIC_API_KEY` in the host's environment (optionally `ALLOWED_ORIGIN` and `CHAT_MODEL`).
3. Set `VITE_CHAT_API_URL` to the deployed `/api/chat` URL and rebuild.

If the variable is unset or the call fails, the chat silently falls back to the local answers. The function caps input sizes and rate-limits per IP on a best-effort basis; it has not been run against the live API yet, so test it after deploying.

## Firestore rules

The contact form writes to a `messages` collection. Allow creates only, and keep reads private:

```
match /messages/{id} {
  allow create: if request.resource.data.keys().hasOnly(['name','email','subject','message','createdAt'])
                && request.resource.data.message is string
                && request.resource.data.message.size() < 5000;
  allow read, update, delete: if false;
}
```

## Deploying

`vercel.json` adds security headers (microphone is allowed for voice control) and long-lived caching for hashed assets. Set `VITE_SITE_URL` to your domain before the production build.

The build output in `dist/` is a static site — deploy it to Vercel, Netlify, Firebase Hosting or GitHub Pages. Set the `VITE_FIREBASE_*` variables in the host's environment settings.
