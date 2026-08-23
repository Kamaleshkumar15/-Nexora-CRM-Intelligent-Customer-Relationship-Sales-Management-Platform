# Nexora CRM — Pro Feature Coverage

This build keeps the original Advanced CRM Dashboard requirements and adds a connected portfolio layer.

## Core assignment
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn-style reusable UI primitives
- TanStack Query caching, loading/error states and mutations
- dnd-kit drag/drop
- Customer search, sorting, pagination, advanced filters, saved views, CRUD and validation

## Dashboard
- KPI cards
- Customer growth line chart
- Customer health donut chart
- Lead funnel
- Revenue chart
- CRM intelligence cards
- Recent activity
- Reorderable dashboard widgets

## Customers
- Debounced search
- Advanced filters
- Saved/reorderable views
- Bulk actions
- CSV export
- Customer workspace
- Health score
- Deal value
- Recently viewed
- Favorites
- Data-quality indicators
- Mobile cards

## Leads
- Hot/Warm/Cold scoring
- Drag-and-drop Kanban
- Lead source analysis
- Linked customer
- Convert/open customer workflow

## Deals
- Pipeline KPIs
- Kanban stages
- Probability and forecast
- Risk indicator
- Customer/task connections

## Tasks
- Status workflow
- Priority and overdue logic
- Calendar grid
- Smart follow-up recommendations
- Customer/deal/company connections

## Companies
- Organization KPIs
- Company workspace
- Connected customers/deals/tasks
- Relationship map

## Analytics
- Customer growth
- Sales performance
- Lead sources
- Health distribution
- Lead funnel
- Company performance
- Deal forecast
- Click-through navigation

## Pro center
- Local CRM AI assistant with natural-language demo queries
- CSV import with validation and duplicate detection
- CSV/JSON export
- Smart alerts
- Follow-up automation rules
- Audit log
- Calendar meeting scheduler
- Mailto email composer
- Users and role management
- Permission matrix
- Customer tag management

## Important architecture note
The app is frontend-first and uses localStorage for demo persistence. TanStack Query is used as the client data/caching layer around that state. No external credentials or backend service are required for the demo.
