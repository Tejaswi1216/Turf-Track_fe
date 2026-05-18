# TurfTrack Frontend

Frontend application for **TurfTrack**, a turf booking and management platform with role-based experiences for users, admins, and super admins.

This project is built to support:
- Turf discovery with search, pricing, and location filtering
- Slot-based booking and checkout
- Online (Razorpay) and cash payment paths
- User authentication with OTP-based registration/recovery flows
- Admin and Super Admin analytics dashboards

---

## Why this project is recruiter-friendly

This repository demonstrates:
- A production-style React + TypeScript architecture
- Role-based access control in the UI layer
- Real API integration patterns (auth, bookings, analytics, exports)
- Payment gateway integration (Razorpay)
- Component-driven UI design using shadcn/ui + Tailwind
- Automated testing with Playwright and CI workflow support

---

## Tech Stack

### Core
- **React 18**
- **TypeScript**
- **Vite 5**
- **React Router v6**

### UI & Styling
- **Tailwind CSS**
- **shadcn/ui**
- **Radix UI**
- **Lucide Icons**
- **Recharts** (analytics visualizations)

### Data, Forms, Validation
- **TanStack Query**
- **React Hook Form**
- **Zod**

### Integrations
- **Backend API** (via `VITE_API_URL`)
- **Supabase** (`@supabase/supabase-js`)
- **Razorpay Checkout**

### Quality & Testing
- **ESLint**
- **Playwright** (browser-based automated test suites in this repo)
- **GitHub Actions** (`.github/workflows/playwright.yml`)

---

## Product Features

- Discover turfs with text search, price range filtering, and location suggestions
- View turf details, select date/time slots, and create bookings
- Checkout flow with:
  - cash payment option
  - Razorpay online payment + verification flow
- Auth flows:
  - login/register
  - OTP verification
  - forgot password + reset
- User account area:
  - profile
  - bookings
  - cancellation/refund handling
- Admin dashboards:
  - booking/revenue analytics
  - turf and booking management
- Super Admin dashboard:
  - platform-wide overview
  - payments, users, turfs, fund transfer views
  - export capabilities

---

## Project Structure

```text
src/
  components/        # Reusable UI and feature components
  context/           # Shared context modules
  hooks/             # Auth + booking hooks
  lib/               # API helpers, analytics, formatting, integrations
  pages/             # Route-level pages (user/admin/superadmin)
  types/             # Shared TypeScript types
tests/
  unit/              # Fast browser tests focused on isolated UI pieces (buttons/forms/cards)
  integration/       # Page and workflow-level browser tests across app routes/APIs
```

---

## Getting Started

### 1) Prerequisites

- **Node.js 20+** (LTS recommended)
- **npm 9+**

### 2) Install dependencies

```bash
npm ci
```

### 3) Configure environment variables

Create a `.env` file in the repository root:

```env
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### 4) Run the app

```bash
npm run dev
```

Default local app URL: `http://localhost:8080`

---

## Available Scripts

- `npm run dev` – start local development server
- `npm run build` – create production build
- `npm run preview` – preview production build locally
- `npm run lint` – run ESLint
- `npm run test:unit` – run the lighter Playwright browser suite (`tests/unit`)
- `npm run test:integration` – run the broader Playwright workflow suite (`tests/integration`)
- `npm run test:all` – run all Playwright tests
- `npm run test:report:html` – generate HTML test report

> Note: script names keep the repository’s existing convention (`test:unit` / `tests/unit`), but these are still browser-driven Playwright tests rather than pure in-process unit tests.

---

## API & Runtime Notes

- Vite dev server proxies `/api/*` to `http://localhost:3000`.
- Netlify config also rewrites `/api/*` to backend endpoint:
  `https://turf-track-be.vercel.app/:splat`
- Auth token is persisted in local storage and used for API requests.
- Role-gated routes are protected for user/admin/superadmin access.

---

## Testing & CI

Local testing:
```bash
npm run test:all
```

CI workflow (`.github/workflows/playwright.yml`) runs:
1. `npm ci`
2. `npx playwright install --with-deps`
3. `npx playwright test`

If Playwright browser binaries are missing locally, run:
```bash
npx playwright install --with-deps
```

---

## Build & Deployment

Production build:
```bash
npm run build
```

Deployment targets:
- Frontend can be hosted as a static Vite app (e.g., Netlify)
- Backend API is consumed through `VITE_API_URL` and API rewrite rules

