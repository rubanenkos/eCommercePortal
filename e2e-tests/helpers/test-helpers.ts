import { Page } from '@playwright/test'

export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1280, height: 720 },
} as const

export async function setViewport(page: Page, size: keyof typeof VIEWPORTS) {
  await page.setViewportSize(VIEWPORTS[size])
}

export async function waitForPageReady(page: Page) {
  await page.waitForLoadState('networkidle')
  await page.waitForLoadState('domcontentloaded')
}

export const selectors = {
  // Auth
  loginForm: 'form[aria-label="Login form"], form',
  registerForm: 'form[aria-label="Register form"], form',
  emailInput: 'input[type="email"], input[name="email"]',
  passwordInput: 'input[type="password"], input[name="password"]',
  nameInput: 'input[name="name"], input[placeholder*="name" i]',

  // Tasks
  taskList: '[data-testid="task-list"], [role="list"]',
  taskCard: '[data-testid="task-card"], article',
  taskTitle: 'h3, [data-testid="task-title"]',
  addTaskButton: 'button:has-text("Add"), button:has-text("New task")',
  taskInput: 'input[placeholder*="task" i], input[name="title"]',

  // Navigation
  sidebar: 'aside, [role="navigation"]',
  mainContent: 'main, [role="main"]',
}
