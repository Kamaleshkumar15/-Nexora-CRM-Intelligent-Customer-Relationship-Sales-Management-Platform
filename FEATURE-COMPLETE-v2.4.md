# Nexora CRM v2.4 — Feature Complete

## Requested features
1. Interactive graphs — charts derive from CRM state and refresh a live data point every 2 seconds.
2. Customer CRUD — create, read, update, delete with validation and React Query mutations.
3. Advanced filtering/search — debounced search, filters, sorting, pagination, saved views.
4. Leads + scoring — score, temperature, stage, drag/drop Kanban, CRUD.
5. Deals + pipeline — stages, probability, forecast, risk, CRUD.
6. Tasks — status, priority, calendar, CRUD.
7. Companies — connected customers/deals/tasks, editable workspace, CRUD.
8. Analytics — connected charts and clickable drill-downs.
9. CRM intelligence — recommendations, risk center, data quality and AI/pro workspace.
10. Drag & drop — leads and customer status/saved views/dashboard widgets.
11. Quick actions — keyboard N, quick-add modal and command palette.
12. Premium responsive UI — desktop/tablet/mobile layouts, themes and density controls.
13. Persistent frontend state — localStorage for CRM data, preferences and profile.
14. Validation + error/loading states — Zod/React Hook Form, loading, retry and empty states.
15. Keyboard shortcuts — Cmd/Ctrl+K, /, N and Esc.
16. Import/export — CSV/JSON via Pro Workspace and customer CSV export.
17. Profile photo — upload/change/remove a local JPG/PNG/WebP image from Dashboard or Settings.
18. Profile name — editable directly on Dashboard and Settings; persisted locally.
19. CRED per entity page — Leads, Deals, Tasks and Companies now expose create/read/update/delete flows; Customers retain full CRUD.

## Run

```powershell
npm install
npm run typecheck
npm run build
npm run dev
```

Open http://localhost:3000

The project is frontend/demo-data based. Data is persisted in browser localStorage and all mutations are implemented through TanStack Query mutation hooks.
