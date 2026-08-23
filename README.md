# Nexora CRM — AI-Powered Customer Relationship & Sales Management Platform

> A professional frontend-first CRM platform built with Next.js, TypeScript, Tailwind CSS, TanStack Query, and dnd-kit.

## 🌐 Live Demo

**[Open Nexora CRM](https://nexora-crm-intelligent-customer-rel.vercel.app/)**

## 💻 Source Code

**[GitHub Repository](https://github.com/Kamaleshkumar15/-Nexora-CRM-Intelligent-Customer-Relationship-Sales-Management-Platform)**

---

## 📌 Overview

**Nexora CRM** is a modern customer relationship and sales management platform designed to demonstrate real-world frontend development practices.

The application provides a centralized workspace for managing:

* 👥 Customers
* 🔥 Leads
* 💰 Deals
* 📋 Tasks
* 🏢 Companies
* 📊 Analytics
* 🤖 CRM Intelligence

The project focuses on **clean architecture, reusable components, CRUD functionality, advanced filtering, state management, validation, responsive UI, data visualization, and user experience**.

---

## ✨ Key Features

### 📊 Dashboard

* Interactive KPI cards
* Customer growth charts
* Customer health analytics
* Lead statistics
* Deal pipeline metrics
* Task statistics
* CRM intelligence
* Smart alerts
* Quick actions
* Real-time UI updates

### 👥 Customer Management

* Create customers
* View customer details
* Edit customers
* Delete customers
* Customer notes
* Last contact tracking
* Customer health
* Deal value
* Account owner
* Favorites
* Tags
* Recently viewed customers
* Bulk actions
* Column customization

### 🔎 Advanced Search & Filtering

* Real-time debounced search
* Search by name
* Search by email
* Search by phone
* Search by company
* Status filtering
* Company filtering
* Date-range filtering
* Multiple filter combinations
* Saved filters
* Filter templates
* Active-filter counter
* Clear filters
* Persistent filter preferences

### 🔥 Lead Management

* Lead CRUD
* Lead scoring
* Hot / Warm / Cold classification
* Kanban pipeline
* Drag-and-drop stages
* Lead sources
* Follow-up management
* Customer relationships

### 💰 Deal Management

* Deal CRUD
* Sales pipeline
* Deal value
* Probability
* Forecast
* Risk indicators
* Customer relationships
* Pipeline stages

### 📋 Task Management

* Task CRUD
* Status workflow
* Priority
* Due dates
* Overdue detection
* Customer relationships
* Deal relationships
* Follow-up management

### 🏢 Company Management

* Company CRUD
* Connected customers
* Connected deals
* Connected tasks
* Company metrics
* Relationship management

### 📈 Analytics

* Customer growth
* Customer health
* Lead analysis
* Deal analysis
* Revenue/deal forecasting
* Company analytics
* Interactive charts
* Data-driven dashboard metrics

### 🤖 CRM Intelligence

* Customer health insights
* Deal risk indicators
* Smart alerts
* Follow-up recommendations
* Next-best-action suggestions
* Local/demo CRM assistant

> CRM intelligence features are implemented as frontend/demo functionality and do not require a paid external AI service.

### 🧩 Drag & Drop

Powered by **dnd-kit**.

Used for:

* Lead pipeline movement
* Saved filter ordering
* Interactive workflow elements

### 👤 Profile Management

* Edit profile name
* Upload profile photo
* Change profile photo
* Remove profile photo
* Persistent profile information
* Dynamic dashboard greeting

### 📤 Import & Export

* CSV import
* CSV validation
* Duplicate detection
* CSV export
* JSON export

### ⚡ Quick Actions

* Add Customer
* Add Lead
* Add Deal
* Add Task
* Add Company
* Add Note
* Command Palette

### ⌨️ Keyboard Shortcuts

| Shortcut   | Action                   |
| ---------- | ------------------------ |
| `Ctrl + K` | Command Palette          |
| `Cmd + K`  | Command Palette on macOS |
| `/`        | Focus Search             |
| `N`        | Quick Add                |
| `Esc`      | Close Dialog             |

### 🌙 Responsive UI

* Premium dark/light interface
* Desktop layout
* Tablet layout
* Mobile navigation
* Responsive tables/cards
* Loading skeletons
* Empty states
* Error states
* Success feedback

---

# 🛡️ Validation & Error Handling

The application includes:

* Required-field validation
* Email validation
* Phone validation
* Inline validation messages
* Loading states
* Error states
* Empty states
* Success states
* Retry actions
* Disabled submission states
* Mutation feedback

---

# 🔄 CRUD Operations

| Module    | Create | Read | Update | Delete |
| --------- | :----: | :--: | :----: | :----: |
| Customers |    ✅   |   ✅  |    ✅   |    ✅   |
| Leads     |    ✅   |   ✅  |    ✅   |    ✅   |
| Deals     |    ✅   |   ✅  |    ✅   |    ✅   |
| Tasks     |    ✅   |   ✅  |    ✅   |    ✅   |
| Companies |    ✅   |   ✅  |    ✅   |    ✅   |

---

# 🧱 Architecture

```text
                    Dashboard
                       │
       ┌───────────────┼────────────────┐
       │               │                │
       ▼               ▼                ▼
   Customers         Leads          Companies
       │               │                │
       ├───────────────┼────────────────┤
       │               │                │
       ▼               ▼                ▼
     Deals           Tasks        Relationships
       │               │                │
       └───────────────┼────────────────┘
                       ▼
                   Analytics
                       │
                       ▼
               CRM Intelligence
```

Customers act as the central entity connecting the major CRM modules.

---

# 🛠️ Tech Stack

| Technology          | Purpose                            |
| ------------------- | ---------------------------------- |
| **Next.js**         | Application framework & App Router |
| **React**           | Component architecture             |
| **TypeScript**      | Type safety                        |
| **Tailwind CSS**    | Styling                            |
| **shadcn/ui**       | Reusable UI components             |
| **TanStack Query**  | Data fetching & caching            |
| **dnd-kit**         | Drag-and-drop                      |
| **React Hook Form** | Form management                    |
| **Zod**             | Validation                         |
| **Lucide React**    | Icons                              |

---

# 💾 State Management

### TanStack Query

Used for:

* Data fetching
* Caching
* Mutations
* Query invalidation
* Refetching
* Loading states
* Error states

### React State

Used for:

* Modals
* Drawers
* Filters
* Search
* Selected records
* View modes
* UI interactions

### localStorage

Used for frontend persistence:

* Profile
* Profile photo
* Theme
* Favorites
* Saved filters
* Dashboard preferences
* Table preferences

---

# 📁 Project Structure

```text
src/
├── app/
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── customers/
│   ├── dashboard/
│   └── ui/
│
├── hooks/
├── lib/
├── providers/
└── types/
```

---

# 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Kamaleshkumar15/-Nexora-CRM-Intelligent-Customer-Relationship-Sales-Management-Platform.git
```

### 2. Enter the project

```bash
cd -Nexora-CRM-Intelligent-Customer-Relationship-Sales-Management-Platform
```

### 3. Install dependencies

```bash
npm install
```

### 4. Run TypeScript checking

```bash
npm run typecheck
```

### 5. Create production build

```bash
npm run build
```

### 6. Start development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# ☁️ Deployment

The project is deployed using **Vercel**.

### Production

**[https://nexora-crm-intelligent-customer-rel.vercel.app/](https://nexora-crm-intelligent-customer-rel.vercel.app/)**

The application uses the standard Next.js deployment configuration.

---

# 🧪 Quality & Testing

The project focuses on testing the most important CRM workflows:

* Customer CRUD
* Lead CRUD
* Deal CRUD
* Task CRUD
* Company CRUD
* Search
* Advanced filtering
* Search + filters
* Sorting
* Pagination
* Saved filters
* Drag-and-drop
* Form validation
* Loading states
* Error states
* Empty states
* Profile persistence
* Import/export
* Responsive layouts
* Analytics updates

Before deployment:

```bash
npm run typecheck
npm run build
```

---

# 🎓 Assessment Alignment

The project was designed around the assessment's key priorities:

```text
Clean Architecture
        ↓
Reusable Components
        ↓
TypeScript
        ↓
Next.js App Router
        ↓
CRUD
        ↓
TanStack Query
        ↓
Advanced Filtering
        ↓
Form Validation
        ↓
Persistence
        ↓
Drag & Drop
        ↓
Loading / Error States
        ↓
Responsive UI
```

The goal is to demonstrate **engineering quality and practical frontend development**, rather than relying only on visual effects.

---

# 👨‍💻 Developer

**Kamaleshkumar**

**B.Tech — Artificial Intelligence & Data Science**

### Areas of Interest

* Frontend Development
* Artificial Intelligence
* Generative AI
* AI Agents
* Data Analytics
* Modern Web Applications

---

# 🔗 Links

### 🌐 Live Demo

[https://nexora-crm-intelligent-customer-rel.vercel.app/](https://nexora-crm-intelligent-customer-rel.vercel.app/)

### 💻 GitHub

[https://github.com/Kamaleshkumar15/-Nexora-CRM-Intelligent-Customer-Relationship-Sales-Management-Platform](https://github.com/Kamaleshkumar15/-Nexora-CRM-Intelligent-Customer-Relationship-Sales-Management-Platform)

---

## ⭐ Project Highlights

> **Nexora CRM combines modern frontend architecture, advanced customer management, interactive analytics, sales workflows, intelligent CRM features, persistence, validation, and responsive SaaS design into one complete application.**

**Built with Next.js • TypeScript • React • Tailwind CSS • TanStack Query • dnd-kit** 🚀
