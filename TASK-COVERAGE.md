# Nexora CRM — Task Coverage

This build covers the supplied Nexora CRM professional specification and keeps the original assessment priorities: clean architecture, connected state, TanStack Query, CRUD, advanced filters, validation, persistence, drag-and-drop, loading/error/empty states and responsive UI.

## Pages
- Dashboard: KPIs, customer growth, health, lead funnel, revenue, intelligence, activity, smart actions and draggable dashboard widget controls.
- Customers: search, debounce, advanced filters, saved views, sorting, pagination 10/25/50, CRUD, bulk status/delete, favorites, recently viewed, data quality, columns, table/cards/kanban/chart views, compare, mobile layout and export/import tools.
- Leads: KPIs, hot/warm/cold scoring, stage filters, drag-and-drop Kanban, detail drawer/modal, conversion to linked customer, create lead form.
- Deals: pipeline KPIs, stage filtering, Kanban, probability, risk center, forecast and connected customer/task actions.
- Tasks: KPIs, status filters, list/table, mobile cards, calendar grid, priorities, overdue detection, smart follow-ups and customer/deal/company relationships.
- Companies: KPI cards, company cards, connected customers/deals/tasks, relationship map and working create-company form.
- Analytics: customer growth, sales performance, lead sources, funnel, company performance, customer health and deal forecast; charts are clickable.
- Settings: profile, theme, accent, table density, dashboard widgets, custom statuses, tags/custom fields, notifications, keyboard shortcuts, data management and accessibility controls.

## Global / Pro workspace
- Global search and Ctrl/Cmd+K command palette.
- Quick Add for customer, lead, deal, task, company and note.
- Notification center.
- Universal entity modals/workspaces.
- AI CRM assistant over the local demo dataset.
- CSV import with validation and duplicate checks.
- CSV/JSON export.
- Smart alerts and automation rules.
- Audit log.
- Calendar scheduling.
- Email composer via local mail client.
- Users and role-based access controls.
- Customer tags and permission matrix.

## Data architecture
The CRM uses connected records rather than isolated page arrays. Customers link to companies, leads, deals, tasks, owners, notes and activities. Leads link to customers and companies; deals link to customers and companies; tasks link to customers, companies and deals. Demo data and user changes persist in browser localStorage and TanStack Query invalidates/refetches after mutations.

## Run

```powershell
npm install
npm run typecheck
npm run build
npm run dev
```

Open `http://localhost:3000`.
