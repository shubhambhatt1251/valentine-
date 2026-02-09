<div align="center">

# 💝 Valentine's Week

### *a fun valentine's week experience i speed-coded in ~2 hours for someone special*

<br>

[![Live Demo](https://img.shields.io/badge/🌹_Live_Demo-valentine--beryl--omega.vercel.app-e11d48?style=for-the-badge)](https://valentine-beryl-omega.vercel.app/)
[![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-000?style=flat-square&logo=vercel&logoColor=white)](https://valentine-beryl-omega.vercel.app/)

<br>

**[🌹 See it live →](https://valentine-beryl-omega.vercel.app/)**

</div>

---

## what is this

valentine's week is feb 7 to feb 14 — so i made an interactive website that covers all 8 days with unique pages, animations, love letters, and some goofy interactions. built it in about 1-2 hours as a fun personal project, never intended it to be anything serious lol

the whole idea: the person opens the site, it asks "will you be my valentine?", and the **no button literally runs away** from their cursor. once they say yes, they unlock a hub with 8 day pages that each reveal on their actual date.

## how it works

| feature | what it does |
|---------|-------------|
| **Landing Page** | "will you be my valentine?" — yes button grows, no button floats around the screen and dodges you |
| **Celebration** | confetti burst + auto-redirect to the hub |
| **Valentine Hub** | 8 day cards with live countdown timers, date-locked |
| **Day Pages** | each day has a different interaction — tap roses, unwrap chocolates, hug a teddy, send kisses, etc. |
| **Love Letters** | unlock after completing each day's activity |
| **Date Gating** | pages unlock only on their real date (feb 7-14) |
| **Protected Routes** | can't access anything until you say yes |

### the 8 days

```
🌹 Rose Day        → tap roses to bloom, each color has a meaning
💍 Propose Day     → 12 reasons auto-reveal one by one
🍫 Chocolate Day   → unwrap chocolates to discover flavors
🧸 Teddy Day       → hug counter with mood meter
🤞 Promise Day     → unseal envelopes with promises
🤗 Hug Day         → warmth meter that fills as you hug
💋 Kiss Day        → send different types of kisses
💝 Valentine's Day → typewriter love letter + timeline
```

## tech used

keeping it simple — no backend, no database, pure frontend:

- **React 18** — functional components, hooks, context api for global state
- **Vite** — dev server + build tool
- **React Router v6** — SPA routing, protected routes, date-gated routes
- **Framer Motion** — all the animations (page transitions, spring physics, gestures, AnimatePresence)
- **canvas-confetti** — confetti explosions on celebrations
- **Plain CSS** — custom variables, glassmorphism, `clamp()` for responsive sizing, keyframe animations
- **localStorage** — persists the "said yes" state so it remembers across sessions

no tailwind, no component library, no external UI kit — everything is hand-styled.

## run locally

```bash
git clone https://github.com/shubhambhatt1251/valentine-.git
cd valentine-
npm install
npm run dev
```

opens at `http://localhost:3000`

## project structure

```
src/
├── components/          # FloatingHearts, TypeWriter, DayPageLayout, etc.
│   ├── CountdownTimer   # live countdown to valentine's day
│   ├── DateGate         # blocks access until the day's date
│   ├── ProtectedRoute   # blocks access until "said yes"
│   ├── LoveLetterCard   # reusable love letter component
│   ├── FloatingHearts   # ambient emoji particle background
│   ├── TypeWriter       # character-by-character text reveal
│   └── DayPageLayout    # shared layout for all 8 day pages
├── context/
│   └── ValentineContext # tracks saidYes state + localStorage sync
├── pages/
│   ├── LandingPage      # the "be my valentine" page
│   ├── CelebrationPage  # confetti + redirect
│   ├── ValentineHub     # hub with all 8 day cards
│   └── days/            # RoseDay, ProposeDay, ChocolateDay, etc.
└── utils/
    └── dateUtils        # date helpers (isToday, isUnlocked, getDaysUntil)
```

## Notes

- This was made for a specific person so there are very personal messages throughout the app. If you wanna fork it for your own use you'd obviously need to change the love letters and nicknames lol
- The dates are hardcoded to 2026 valentine's week (Feb 7-14). You'd need to update `dateUtils.js` if you want different dates
- No backend — everything runs client-side. The "said yes" state is just localStorage

## some stuff worth mentioning

- **built in ~1-2 hours** — this was a speed project just for fun, don't judge the inline styles too hard lol
- **fully responsive** — works on phones, tablets, desktops. used `clamp()` everywhere + mobile-specific CSS
- **accessibility** — respects `prefers-reduced-motion`, disabled animations for users who need it
- **personal project** — the love letters and nicknames in there are very specific to one person. if you fork it, you'd need to swap those out obviously
- **dates are hardcoded** to valentine's week 2026 (feb 7-14) in `dateUtils.js` — change them if you're using this for a different year
- **no backend at all** — the only "persistence" is localStorage remembering if the user said yes
- **deployed on vercel** — zero config, just connected the repo and it auto-deploys

## why i built this

honestly? valentine's week was coming up and i wanted to do something different instead of just sending a text. figured i'd code something quick and fun. no deep reason, just vibes. took about 1-2 hours and was a pretty fun little build.

---

<div align="center">

**[🌹 valentine-beryl-omega.vercel.app](https://valentine-beryl-omega.vercel.app/)**

made with ❤️ and a couple hours of free time

</div>

---

## GitHub Onboarding & Quick Start

```
Owner avatar
valentine-
Public
Start coding with Codespaces
Add a README file and start coding in a secure, configurable, and dedicated development environment.

Add collaborators to this repository
Search for people using their GitHub username or email address.

Quick setup — if you’ve done this kind of thing before
or	
https://github.com/shubhambhatt1251/valentine-.git
Get started by creating a new file or uploading an existing file. We recommend every repository include a README, LICENSE, and .gitignore.

…or create a new repository on the command line
echo "# valentine-" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/shubhambhatt1251/valentine-.git
git push -u origin main
…or push an existing repository from the command line
git remote add origin https://github.com/shubhambhatt1251/valentine-.git
git branch -M main
git push -u origin main
```

