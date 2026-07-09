# 🩺 MediQueue — Tutor Booking Platform

<div align="center">

**Find, book, and learn from expert tutors with real-time slot tracking and instant confirmations.**

[🌐 **Live Demo**](https://mediqueue-by-marufbillah.vercel.app) • [📖 **Documentation**](#getting-started) • [🎨 **Design System**](#-design-system) • [💻 **Backend Repo**](https://github.com/imarufbillah/mediqueue-server)

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Stripe](https://img.shields.io/badge/Better_Auth-JWT-5469d4?style=flat-square)](https://www.better-auth.com/)

</div>

---

## 📸 Screenshots

### Homepage & Tutor Discovery
![Hero Section](https://via.placeholder.com/1200x600?text=MediQueue+Homepage+-+Hero+%26+Featured+Tutors)

### Tutor Listing & Slot Tracking
![Tutor Cards](https://via.placeholder.com/1200x600?text=Tutor+Cards+-+Real-Time+Slot+Indicator)

### Booking & Confirmation
![Booking Modal](https://via.placeholder.com/1200x600?text=Booking+Modal+-+Token+Card+Confirmation)

### User Dashboard
![My Bookings](https://via.placeholder.com/1200x600?text=My+Bookings+-+Session+Management)

---

## 📋 Project Overview

**MediQueue** is a full-stack tutor booking platform with a **Dark Clinical-Luxury** design aesthetic—deep navy surfaces, electric teal accents, and crisp typography. Students can discover qualified tutors, book sessions in real-time, and receive instant confirmation cards (boarding-pass style) with unique reference codes.

### 🎯 Key Value Propositions
- ✅ **Real-Time Availability** — Radial SVG slot indicators prevent double-bookings
- ✅ **Secure Booking** — JWT authentication with protected routes
- ✅ **Instant Confirmations** — Shimmer-animated token cards with reference codes
- ✅ **Mobile-First** — Fully responsive across all devices
- ✅ **Dark & Light Theme** — Switch seamlessly between modes

---

## ✨ Core Features

### 🔐 Authentication & Security
| Feature | Details |
|---------|---------|
| **Email/Password Auth** | Secure registration & login |
| **Google OAuth** | One-click sign-in with Google |
| **JWT Sessions** | Token-based authentication |
| **Protected Routes** | Route guards on client & server |
| **XSS Protection** | HTTPOnly secure cookies |

### 🎓 Tutor Discovery
- **Browse Tutors** — View all available tutors with profiles
- **Real-Time Slots** — Visual radial SVG indicator showing available slots
- **Auto Lock** — Slots automatically lock when full (no double-bookings)
- **Tutor Profiles** — Detailed info: name, subject, experience, qualifications
- **Featured Tutors** — Homepage carousel of top-rated tutors
- **Search & Filter** — Find tutors by subject or experience level

### 📅 Booking System
| Feature | Details |
|---------|---------|
| **Instant Booking** | One-click session booking |
| **Date Picker** | Customizable calendar for session selection |
| **Confirmation Card** | Boarding-pass-style token with reference code |
| **Session Details** | Tutor name, time, session ID, confirmation number |
| **Real-time Updates** | Live slot count & availability status |

### 👤 User Dashboard
| Page | Functionality |
|------|---------------|
| **My Tutors** | Manage your tutor listings (edit, delete) |
| **My Bookings** | View active & cancelled sessions |
| **Cancel Session** | Cancel with confirmation dialog |
| **Profile** | View account details & settings |

### 🎨 UI/UX Excellence
- **Dark Clinical-Luxury Design** — Navy + teal + white palette
- **Framer Motion Animations** — Smooth transitions & spring effects
- **Skeleton Loaders** — Loading states on all async operations
- **Toast Notifications** — Real-time feedback via Sonner
- **Responsive Grids** — Mobile, tablet, desktop optimization
- **Accessible Components** — shadcn/ui with Radix primitives
- **Dual Theme** — Light/dark mode with system detection

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | [Next.js 15](https://nextjs.org) (App Router) | React SSR framework |
| **UI Library** | [React 19](https://react.dev) | Modern React UI |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) | Utility CSS + accessible components |
| **Components** | [Radix UI](https://radix-ui.com) | Unstyled accessible primitives |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) | Physics-based animations |
| **Authentication** | [BetterAuth](https://www.better-auth.com) + JWT | Secure user sessions |
| **Database** | [MongoDB](https://mongodb.com) | Document store for tutors/bookings |
| **Backend** | [Express.js](https://expressjs.com) (separate repo) | RESTful API |
| **Theme** | [next-themes](https://github.com/pacocoursey/next-themes) | Dark/light mode |
| **Date Picker** | [react-datepicker](https://reactdatepicker.com/) | Calendar input |
| **Icons** | [Lucide React](https://lucide.dev) + [React Icons](https://react-icons.github.io/react-icons/) | Icon libraries |
| **Toasts** | [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |
| **Utilities** | [date-fns](https://date-fns.org/) | Date utilities |
| **Deployment** | [Vercel](https://vercel.com) | Edge-optimized hosting |

---

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── api/
│   │   └── auth/[...all]/      # BetterAuth catch-all handler
│   ├── page.jsx                # Homepage
│   ├── tutors/
│   │   ├── page.jsx            # Browse all tutors
│   │   └── [id]/
│   │       └── page.jsx        # Tutor detail & booking
│   ├── add-tutor/
│   │   └── page.jsx            # Create tutor listing (protected)
│   ├── my-tutors/
│   │   └── page.jsx            # Your tutor listings (protected)
│   ├── my-bookings/
│   │   └── page.jsx            # Your bookings (protected)
│   ├── profile/
│   │   └── page.jsx            # User profile (protected)
│   ├── layout.js               # Root layout
│   └── error.jsx               # Error boundary
├── components/
│   ├── ui/                     # shadcn/ui components
│   │   ├── Button.jsx
│   │   ├── Dialog.jsx
│   │   ├── Form.jsx
│   │   ├── Input.jsx
│   │   ├── Table.jsx
│   │   └── ...
│   ├── home/                   # Homepage sections
│   │   ├── HeroCarousel.jsx
│   │   ├── FeaturedTutors.jsx
│   │   ├── HowItWorks.jsx
│   │   └── Stats.jsx
│   ├── tutors/                 # Tutor listing components
│   │   ├── TutorCard.jsx
│   │   ├── TutorGrid.jsx
│   │   └── TutorSearch.jsx
│   ├── tutor-details/          # Booking components
│   │   ├── BookingPanel.jsx
│   │   ├── BookingModal.jsx
│   │   ├── TokenCard.jsx
│   │   └── SlotIndicator.jsx
│   ├── layout/                 # Layout components
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── auth/                   # Auth forms
│       ├── SignIn.jsx
│       └── SignUp.jsx
├── lib/
│   ├── auth.js                 # BetterAuth server config
│   ├── auth-client.js          # Client auth instance
│   ├── api-client.js           # REST API client
│   ├── data.js                 # Server-side data fetching
│   └── utils.js                # Utility functions
├── providers/
│   └── ThemeProvider.jsx       # next-themes wrapper
└── styles/
    └── globals.css             # Global styles & tokens
```

---

## 🎨 Design System

### Color Tokens
| Token | Color | Usage |
|-------|-------|-------|
| `bg-background` | Deep Navy | Page backgrounds |
| `bg-card` | Navy-900 | Card surfaces |
| `bg-primary` | Electric Teal | CTAs, active states |
| `text-primary` | Teal | Links, highlights |
| `text-muted-foreground` | Gray-400 | Secondary text |
| `border-border` | Navy-700 | Borders & dividers |
| `ring-ring` | Teal | Focus outlines |

### Typography
| Token | Font | Usage |
|-------|------|-------|
| `font-heading` | DM Serif Display | Hero headings, section titles |
| `font-sans` | Plus Jakarta Sans | Body, UI, buttons |
| `font-mono` | JetBrains Mono | Booking codes, reference IDs |

### Component Primitives (shadcn/ui)
- Button, Dialog, Form, Input, Label, Textarea, Checkbox, Radio
- Table, Card, Separator, Badge, Alert, Skeleton
- All built on Radix UI for accessibility

---

## 📄 Pages & Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Homepage with hero carousel & featured tutors |
| `/tutors` | Public | Browse all tutors with search |
| `/tutors/[id]` | Protected | Tutor detail with booking panel |
| `/add-tutor` | Protected | Create new tutor listing |
| `/my-tutors` | Protected | Manage your tutor listings |
| `/my-bookings` | Protected | View & cancel your bookings |
| `/profile` | Protected | User profile page |
| `/sign-in` | Public | Email/password + Google sign in |
| `/sign-up` | Public | Account registration |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have installed:

- **Node.js 18+** — [Download](https://nodejs.org)
- **npm or yarn** — Package manager
- **MongoDB Atlas Account** — [Create Free](https://mongodb.com/atlas)
- **Google OAuth Credentials** — [Get from Google Console](https://console.cloud.google.com)
- **Backend API running** — [MediQueue Server Repo](https://github.com/imarufbillah/mediqueue-server)

### Installation Steps

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/imarufbillah/mediqueue-client.git
cd mediqueue-client
```

#### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

#### 3️⃣ Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Better Auth Configuration
BETTER_AUTH_SECRET=your_random_secret_key_min_32_chars
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# MongoDB
MONGO_DB_URI=mongodb+srv://username:password@cluster.mongodb.net/mediqueue?retryWrites=true&w=majority

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Backend API
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

**Environment Variable Details:**

| Variable | Description | Example |
|----------|-------------|---------|
| `BETTER_AUTH_SECRET` | Secret for JWT signing | Generate: `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | App base URL | `http://localhost:3000` |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Public auth URL (client) | `http://localhost:3000` |
| `MONGO_DB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `GOOGLE_CLIENT_ID` | OAuth app client ID | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | OAuth app secret | From Google Cloud Console |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | `http://localhost:5000` |

#### 4️⃣ Start Development Server

```bash
npm run dev
```

Open your browser to **[http://localhost:3000](http://localhost:3000)**

#### 5️⃣ Build for Production

```bash
npm run build
npm run start
```

---

## 📦 Dependencies Overview

### Core Dependencies

```json
{
  "next": "16.2.6",              // Next.js framework
  "react": "19.2.4",             // React UI library
  "react-dom": "19.2.4",         // React DOM
  "tailwindcss": "^4",           // Utility CSS
  "better-auth": "^1.6.11",      // Authentication
  "mongodb": "^7.2.0",           // Database driver
  "framer-motion": "^12.38.0",   // Animations
  "react-datepicker": "^9.1.0",  // Date picker
  "lucide-react": "^1.16.0",     // Icons
  "sonner": "^2.0.7",            // Toast notifications
  "next-themes": "^0.4.6",       // Theme management
  "react-icons": "^5.6.0",       // Additional icons
  "date-fns": "^4.2.1",          // Date utilities
}
```

For complete list, see [package.json](./package.json)

---

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint code linting |

---

## 🔗 Important Links

| Resource | URL |
|----------|-----|
| 🌐 **Live Demo** | [mediqueue-by-marufbillah.vercel.app](https://mediqueue-by-marufbillah.vercel.app) |
| 📚 **Backend Repo** | [github.com/imarufbillah/mediqueue-server](https://github.com/imarufbillah/mediqueue-server) |
| 🔐 **MongoDB** | [mongodb.com/atlas](https://mongodb.com/atlas) |
| 🔑 **Google OAuth** | [console.cloud.google.com](https://console.cloud.google.com) |
| 📖 **Next.js Docs** | [nextjs.org/docs](https://nextjs.org/docs) |
| 🎨 **Tailwind Docs** | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| 🔐 **BetterAuth Docs** | [better-auth.com/docs](https://www.better-auth.com/docs) |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is for educational purposes. All rights reserved © 2024 Maruf Billah

---

<div align="center">

**Built with 🩺 by [Maruf Billah](https://github.com/imarufbillah)**

[⬆ Back to top](#-mediqueue--tutor-booking-platform)

</div>
