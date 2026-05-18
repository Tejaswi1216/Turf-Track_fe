import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  timeout: 30_000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  // Start a Vite dev server on port 8080 for integration tests so
  // Playwright can navigate to the app at http://localhost:8080
  webServer: {
    command: 'npm run dev -- --port 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: true,
    timeout: 120_000,
  },
  use: {
    baseURL: 'http://localhost:8080',
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10_000,
    trace: 'on-first-retry',
  },
  projects: [
    { 
      name: 'unit', 
      testMatch: 'tests/unit//*.spec.ts', 
      use: { ...devices['Desktop Chrome'] },
    },
    { 
      name: 'integration', 
      testMatch: 'tests/integration//*.spec.ts', 
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});