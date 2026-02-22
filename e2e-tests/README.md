# E2E Tests for Task Management Application

Comprehensive end-to-end tests using Playwright for the task management application.

## Structure

```
e2e-tests/
├── fixtures/
│   └── auth.fixture.ts    # Auth fixtures (testUser, authenticatedPage)
├── helpers/
│   └── test-helpers.ts    # Viewport helpers, selectors
├── tests/
│   ├── auth.spec.ts       # Authentication tests
│   ├── tasks.spec.ts      # Task management tests
│   ├── navigation.spec.ts # Navigation tests
│   ├── accessibility.spec.ts # Accessibility tests
│   ├── responsive.spec.ts # Responsive design tests
│   ├── errors.spec.ts     # Error handling tests
│   └── product-search.spec.ts # Product search & filter tests
├── playwright.config.ts  # (at project root)
└── README.md
```

## Test Scenarios

### 1. Authentication (auth.spec.ts)
- User registration flow
- Login with valid credentials
- Login with invalid credentials
- Logout functionality
- Session persistence

### 2. Task Management (tasks.spec.ts)
- Create new task
- Edit task status (mark complete, in progress)
- Delete task
- Filter and search tasks

### 3. Navigation (navigation.spec.ts)
- Navigate between pages (dashboard, settings)
- User menu navigation
- Browser back button

### 4. Accessibility (accessibility.spec.ts)
- Keyboard navigation
- ARIA labels and roles
- Screen reader compatibility (labels, role="alert")

### 5. Responsive Design (responsive.spec.ts)
- Mobile viewport (375x667)
- Tablet viewport (768x1024)
- Desktop viewport (1280x720)
- Orientation changes

### 6. Error Handling (errors.spec.ts)
- Invalid login credentials
- Empty form validation
- Protected route redirect
- Task form validation

### 7. Product Search (product-search.spec.ts)
- Search with valid query
- Search with no results (empty state)
- Apply single/multiple filters
- Clear all filters
- Pagination navigation
- Sort by different criteria
- Error handling (query too long)
- Responsive viewports (mobile, tablet, desktop)

## Prerequisites

- Node.js 18+
- npm or yarn

## Setup

Install Playwright browsers (required on first run):

```bash
npx playwright install
```

## Running Tests

```bash
# Run all E2E tests (starts dev server automatically)
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# Run specific test file
npx playwright test e2e-tests/tests/auth.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Run on specific browser
npx playwright test --project=chromium
```

## Test Credentials

- **Email:** test@example.com
- **Password:** TestPassword123!

## Configuration

Tests use `playwright.config.ts` at the project root. The dev server is started automatically at `http://localhost:5173` when running tests.
