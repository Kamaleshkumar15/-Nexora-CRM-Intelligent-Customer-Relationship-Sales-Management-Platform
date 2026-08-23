# Nexora CRM — AI-Powered Customer Relationship & Sales Management Platform

Professional frontend-first CRM built with Next.js App Router, TypeScript, Tailwind CSS, shadcn-style UI primitives, TanStack Query and dnd-kit.

## Includes

- Dashboard command center with interactive charts and CRM intelligence
- Customers workspace with real-time debounced search, advanced filters, saved views, CRUD, validation, pagination, bulk actions, favorites, tags and column controls
- Lead Kanban with drag-and-drop stages, scoring and source analysis
- Deals pipeline with probability, forecast and risk indicators
- Tasks action center with status workflow, overdue logic and calendar
- Companies relationship hub connected to customers, deals and tasks
- Analytics with clickable customer, lead, deal and company visualizations
- Settings with appearance, accessibility, dashboard controls and data management
- Global command palette, notifications, quick add and responsive mobile navigation
- Pro Center: local AI CRM assistant, CSV import/validation/duplicate detection, CSV/JSON export, smart alerts, automation rules, audit log, meeting scheduler, email composer, users/roles and tag management

## Run

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

Then open `http://localhost:3000`.

## Architecture

Customers are the central entity. Leads, deals, tasks and companies reference customer/company IDs and analytics are derived from the same connected state. Demo persistence uses localStorage, while TanStack Query provides the data-fetching/cache layer expected by the task.

See `PRO-FEATURES.md` for full feature coverage and `START-HERE.txt` for quick setup.

## v2.4 additions
- Live-updating dashboard chart point
- Dashboard profile photo upload/change and editable name
- CRED controls for Leads, Deals, Tasks and Companies
- Persistent profile state
- Feature matrix: `CRED-MATRIX.md`
- Full feature notes: `FEATURE-COMPLETE-v2.4.md`
