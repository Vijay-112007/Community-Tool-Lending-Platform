# CTLP — Community Tool Lending Platform (Borrower Frontend)

Borrower-facing frontend for the Community Tool Lending Platform academic project.

## Tech Stack

- React + Vite
- React Router
- CSS (custom design system)
- Fetch API (service layer ready for backend integration)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Dashboard, Browse Tools, Tool Details
├── services/       # API layer (mock now, HTTP later)
├── data/           # Centralized mock data
├── context/        # Auth context (session-based prep)
├── hooks/          # Custom hooks
├── styles/         # Global CSS design system
├── App.jsx
└── main.jsx
```

## Pages

| Route | Page |
|-------|------|
| `/` | Borrower Dashboard |
| `/browse` | Browse Tools |
| `/tools/:id` | Tool Details |

## Backend Integration

Services in `src/services/` use a `USE_MOCK` flag. To connect the real backend:

1. Set `VITE_API_BASE_URL` in a `.env` file
2. Flip `USE_MOCK` to `false` in each service file
3. Ensure the backend uses session cookies (`credentials: 'include'`)

Expected endpoints:

- `GET /api/me`
- `GET /api/tools`
- `GET /api/tools/:id`
- `POST /api/reservations`
- `GET /api/borrowings`
- `GET /api/notifications`

## Design

Visual identity: **Warm Utility / Community Workshop**

- Warm off-white background, charcoal text, muted amber accent
- Lending-tag style status badges
- Responsive: mobile (<768px), tablet (768–1023px), desktop (≥1024px)
