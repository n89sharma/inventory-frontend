# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Type-check + production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

No test runner is configured.

## Environment

Copy `.env` and set `VITE_INVENTORY_API_URL` to the backend base URL:
- Local: `http://localhost:3000/`
- Remote: `https://inventory-backend-dev.up.railway.app/`

## Architecture

**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, shadcn/ui, React Router v7, Zustand, React Hook Form + Zod, TanStack Table, Axios.

### Data Flow

The app follows a strict three-layer pattern for all data:

1. **API layer** (`src/data/api/`) — Axios calls + Zod schema validation of responses. Each module exports typed functions (e.g., `getArrivals`, `createArrival`) and infers TypeScript types from Zod schemas.
2. **Store layer** (`src/data/store/`) — Zustand stores hold fetched data in memory. Stores are thin: state + setters only, no logic.
3. **Hook layer** (`src/hooks/`) — `useEffect`-based hooks call the API on mount and populate stores (e.g., `useModelData`, `useOrgData`, `useConstantsData`). These three hooks are called once at the top of `App` to preload global reference data.

Page components read from the store via Zustand selectors and fetch their own paginated data (e.g., arrivals by date range) via API functions called directly in event handlers.

### Routing

All routes are defined in `src/app.tsx`. The sidebar nav mirrors the route structure:
- `/arrivals`, `/transfers`, `/departures`, `/holds`, `/invoices` — list pages using the shared `CollectionPage` pattern
- `/arrivals/new` — create form
- `/:section/:id` — asset summary detail view
- `/query`, `/assets`, `/reports` — standalone pages

### Component Organization

```
src/components/
  layout/       # MainLayout (sidebar + header wrapper), AppSidebar, Header
  pages/        # One file per route page; column-defs/ for TanStack Table column definitions
  custom/       # Reusable domain-aware components (PopoverSearch, DatePicker, AssetSearch, etc.)
  shadcn/       # shadcn/ui primitives (do not modify these directly)
```

### Forms

Create/edit forms use React Hook Form with `zodResolver`. Validation schemas live in `src/lib/` (e.g., `arrival-validator.ts`) and are separate from API response schemas. Complex object fields (vendor, transporter, warehouse) are stored as full objects in form state, not just IDs.

### Conventions

- Arrow functions with a single parameter do not use parentheses: `x => x.name`
- `cn()` from `src/lib/utils.ts` merges Tailwind classes (clsx + tailwind-merge)
- `axiosErrorHandler` from `src/lib/utils.ts` is used as a `.catch()` handler on mutation API calls
- Icons come from `@phosphor-icons/react`
- Toast notifications use `sonner`
- Path alias `@/` maps to `src/`
