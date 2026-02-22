# Portal

A comprehensive project management and collaboration portal built with React, TypeScript, and Tailwind CSS. The application provides task management, team collaboration, Kanban boards, social feed, and more—all with a modern UI and full dark mode support.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Setup Guide](#setup-guide)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Application Routes](#application-routes)
- [State Management](#state-management)
- [Testing](#testing)
- [Test Credentials](#test-credentials)

---

## Features

### Authentication
- **Login** – Sign in with email and password
- **Registration** – Simple and multi-step registration flows
- **Protected routes** – Dashboard, Team, Board, Feed, and Settings require authentication
- **Session persistence** – User state stored in sessionStorage

### Task Dashboard
- **Task list** – Create, edit status, and delete tasks
- **Search & filter** – Filter by status (Todo, In Progress, Done)
- **Statistics** – Widgets showing task counts and progress
- **Integration** – Task completion updates stats, progress chart, and activity feed

### Team Dashboard
- **Metric cards** – Total tasks, In Progress, Active Projects, Team Members
- **Quick actions** – New Task, New Project, Invite Member, Upload File
- **Project overview** – Real-time metrics, progress indicators, status badges, trend indicators
- **Progress charts** – Task completion visualization, project milestones, timeline view
- **Team members** – Avatars, online status, role badges, quick contact (message, email)
- **Activity feed** – Recent activity with task completions, comments, member joins
- **Integration** – Task completed → stats + progress + activity; Member added → team + activity

### Kanban Board
- **Columns** – Todo, In Progress, Done
- **Task cards** – Title, description, assignee, due date, priority
- **Drag and drop** – Move tasks between columns
- **Add task** – Modal with title, description, priority, due date, assignee
- **Edit task** – Full edit modal for existing tasks
- **Task assignment** – Assign tasks to team members
- **localStorage** – Board state persisted across sessions
- **Filter & search** – By priority and assignee

### Social Feed
- **Create post** – Text and image attachment (with preview)
- **Post cards** – User info, content, images, like/comment/share
- **Like/unlike** – Toggle likes on posts
- **Comments** – Add comments and view threads
- **Share** – Placeholder (increments share count)
- **Infinite scroll** – Load more placeholder

### Product Search
- **Search** – Filter products by query
- **Filters** – Category, price range
- **Sort** – By relevance, price, etc.
- **Pagination** – Navigate through results

### Settings
- **Profile** – Name, email
- **Notifications** – Email, marketing preferences
- **Appearance** – Theme (light/dark/system)

### Global
- **Dark mode** – Theme toggle with persistence (localStorage)
- **Responsive design** – Mobile, tablet, desktop
- **Tailwind CSS** – Utility-first styling

---

## Tech Stack

- **React 19** – UI library
- **TypeScript** – Type safety
- **Vite 7** – Build tool and dev server
- **React Router 7** – Client-side routing
- **Tailwind CSS 4** – Styling
- **Playwright** – E2E testing

---

## Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** (or yarn/pnpm)

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd Portal

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## Setup Guide

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Vite will start the dev server with HMR. Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production

```bash
npm run build
```

Output is written to the `dist/` folder. Preview the build with:

```bash
npm run preview
```

### 4. Run E2E Tests (Optional)

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all E2E tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui
```

E2E tests start the dev server automatically. Ensure no other process is using port 5173.

---

## Available Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start development server (Vite) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:ui` | Run Playwright tests in UI mode |

---

## Project Structure

```
Portal/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Dashboard/      # Task dashboard, sidebar, header
│   │   ├── TeamDashboard/   # Team metrics, projects, members, activity
│   │   ├── kanban/          # Kanban board, columns, task cards
│   │   ├── feed/            # Social feed, posts, comments
│   │   ├── shared/          # Card, Badge, Avatar
│   │   ├── settings/        # Settings panel, form inputs
│   │   └── ...
│   ├── contexts/            # React Context providers
│   │   ├── ThemeContext.tsx
│   │   ├── UserContext.tsx
│   │   ├── ActivityContext.tsx
│   │   ├── TasksContext.tsx
│   │   └── TeamContext.tsx
│   ├── pages/               # Route-level components
│   ├── components/types/     # TypeScript interfaces
│   ├── App.tsx
│   └── main.tsx
├── e2e-tests/
│   ├── fixtures/            # Test fixtures (auth)
│   └── tests/               # Playwright test specs
├── playwright.config.ts
├── vite.config.ts
├── tailwind.config.js
└── package.json
```

---

## Application Routes

| Path | Description | Auth |
|------|-------------|------|
| `/` | Redirects to `/dashboard` | - |
| `/login` | Login page | Public |
| `/register` | Registration page | Public |
| `/register/multi-step` | Multi-step registration | Public |
| `/dashboard` | Task dashboard | Protected |
| `/team` | Team dashboard | Protected |
| `/board` | Kanban board | Protected |
| `/feed` | Social feed | Protected |
| `/settings` | Settings page | Protected |
| `/products` | Product search | Public |

---

## State Management

- **Local state** – `useState` for UI (modals, filters, forms)
- **Context API** – Shared state for theme, user, activity, tasks, team
- **Props** – Component communication (callbacks, data)
- **localStorage** – Theme preference, Kanban board tasks
- **sessionStorage** – Auth state, user data

### Integration Points

- **Task completed** → Updates stats, progress chart, activity feed
- **Member added** → Updates team section and activity feed
- **Theme toggle** → Updates all components (dark mode)

---

## Testing

### E2E Tests (Playwright)

Tests cover:

- **Authentication** – Login, registration, logout, session
- **Tasks** – Create, edit status, delete, filter, search
- **Navigation** – Routes, user menu, back button
- **Accessibility** – Keyboard nav, ARIA, labels
- **Responsive** – Mobile, tablet, desktop viewports
- **Errors** – Invalid login, validation, protected routes
- **Product search** – Search, filters, pagination, sort
- **Multi-step form** – Validation, steps, submission

### Running Tests

```bash
# All tests
npm run test:e2e

# Specific file
npx playwright test e2e-tests/tests/auth.spec.ts

# Headed mode (see browser)
npx playwright test --headed

# Single browser
npx playwright test --project=chromium
```

---

## Test Credentials

Use these credentials to log in:

- **Email:** `test@example.com`
- **Password:** `TestPassword123!`

---

## License

Private project.
