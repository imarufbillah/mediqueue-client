<p align="center">
  <img src="./public/logo.svg" alt="MediQueue Logo" width="48" height="48" />
</p>

<h1 align="center">MediQueue</h1>

<p align="center">
  <strong>Tutor Booking System — Find, Book, Learn.</strong>
</p>

<p align="center">
  <a href="https://mediqueue-by-marufbillah.vercel.app">
    <img src="https://img.shields.io/badge/Live_Site-mediqueue--by--marufbillah.vercel.app-00b5a3?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Site" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Framer_Motion-Animations-FF0050?style=flat-square&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

---

## ✨ Overview

MediQueue is a full-stack tutor booking platform built with a **Dark Clinical-Luxury** design philosophy — deep navy surfaces, electric teal accents, and crisp typography. Students can discover verified tutors across multiple subjects, check real-time slot availability, and book learning sessions in seconds.

> 🔗 **Live:** [https://mediqueue-by-marufbillah.vercel.app](https://mediqueue-by-marufbillah.vercel.app)

---

## 🎯 Key Features

| #   | Feature                     | Description                                                                                                                   |
| --- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Real-Time Slot Tracking** | Visual radial SVG indicator on every tutor card. Slots lock automatically when full — no double-bookings.                     |
| 2   | **Secure Authentication**   | Email/password + Google OAuth via BetterAuth. JWT-based sessions with protected route middleware.                             |
| 3   | **Tutor CRUD**              | Create, edit, and delete tutor listings with live image preview, date picker, and full client-side validation.                |
| 4   | **Token Card Booking**      | Boarding-pass-style confirmation card with shimmer animation, unique reference code in monospace, and session details.        |
| 5   | **Dark & Light Theme**      | Dual-theme system via next-themes. oklch color tokens ensure consistent contrast across both modes.                           |
| 6   | **Responsive Everything**   | Mobile-first grids, horizontally scrollable tables, full-screen modals on small screens, and a polished slide-out nav drawer. |
| 7   | **Booking Management**      | View active/cancelled sessions, cancel with confirmation dialog, real-time loading states, and toast feedback.                |

---

## 🏗️ Architecture

```
src/
├── app/                    # Next.js App Router pages & API routes
│   ├── api/auth/           # BetterAuth catch-all handler
│   ├── tutors/[id]/        # Dynamic tutor detail page
│   ├── my-tutors/          # User's tutor listings (protected)
│   ├── my-bookings/        # User's booked sessions (protected)
│   └── ...
├── components/
│   ├── ui/                 # shadcn/ui primitives (Button, Dialog, Table…)
│   ├── home/               # Hero carousel, AvailableTutors, HowItWorks, Stats
│   ├── tutors/             # TutorCard, TutorGrid
│   ├── tutor-details/      # BookingPanel, BookingModal, TokenCard, SlotIndicator
│   ├── my-tutors/          # ListingsTable, EditDialog, DeleteDialog
│   ├── my-bookings/        # BookingsTable, CancelDialog
│   └── layout/             # Navbar, Footer
├── lib/
│   ├── auth.js             # BetterAuth server config (MongoDB adapter, JWT plugin)
│   ├── auth-client.js      # BetterAuth client (useSession, signIn, signUp)
│   ├── data.js             # Server-side data fetching (JWT-authenticated)
│   ├── api-client.js       # Client-side mutations (CRUD operations)
│   └── utils.js            # cn(), formatDate()
└── providers/
    └── ThemeProvider.jsx   # next-themes wrapper
```

---

## 🎨 Design System

| Token                   | Purpose                                 |
| ----------------------- | --------------------------------------- |
| `bg-background`         | Page surface (swaps between light/dark) |
| `bg-card`               | Elevated card surfaces                  |
| `bg-primary`            | Electric teal — CTAs, active states     |
| `text-primary`          | Teal text — links, highlights           |
| `text-muted-foreground` | Secondary/placeholder text              |
| `border-border`         | Default borders                         |
| `ring-ring`             | Focus outlines (teal)                   |

**Typography:**

- `font-heading` — DM Serif Display (hero headings, section titles)
- `font-sans` — Plus Jakarta Sans (all UI, body, buttons)
- `font-mono` — JetBrains Mono (booking codes, IDs)

---

## ⚡ Tech Stack

| Layer       | Technology                  | Why                                                    |
| ----------- | --------------------------- | ------------------------------------------------------ |
| Framework   | Next.js 15 (App Router)     | Server components, streaming, file-based routing       |
| Language    | JavaScript (ES6+)           | Clean, no TypeScript overhead for this scope           |
| Styling     | Tailwind CSS v4 + shadcn/ui | Utility-first with accessible Radix primitives         |
| Auth        | BetterAuth + JWT            | Flexible auth with social providers and session tokens |
| Database    | MongoDB                     | Document-based, pairs well with tutor/booking schemas  |
| Backend     | Express.js (separate repo)  | RESTful API with JWT verification middleware           |
| Animation   | Framer Motion               | Spring-based transitions, layout animations            |
| Theme       | next-themes                 | Class-based dark mode toggle with system detection     |
| Toast       | Sonner                      | Lightweight, accessible notification system            |
| Date Picker | react-datepicker            | Customizable, themed calendar input                    |
| Deployment  | Vercel                      | Edge-optimized, zero-config Next.js hosting            |

---

## 📄 Pages & Routes

| Route          | Access    | Description                                         |
| -------------- | --------- | --------------------------------------------------- |
| `/`            | Public    | Hero carousel, featured tutors, how-it-works, stats |
| `/tutors`      | Public    | Browse all available tutors with search             |
| `/tutors/[id]` | Protected | Tutor detail with booking panel                     |
| `/add-tutor`   | Protected | Create a new tutor listing                          |
| `/my-tutors`   | Protected | Manage your tutor listings (edit/delete)            |
| `/my-bookings` | Protected | View and cancel your booked sessions                |
| `/profile`     | Protected | User profile page                                   |
| `/sign-in`     | Public    | Email/password + Google sign in                     |
| `/sign-up`     | Public    | New account registration                            |

---

<p align="center">
  Built with 🩺 by <strong>Maruf Billah</strong>
</p>
