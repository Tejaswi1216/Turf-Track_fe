import { test, expect } from '@playwright/test';

test.describe('NotFound Page', () => {
  test('renders not found message', async ({ page }) => {
    await page.goto('/some-non-existent-route-xyz');
    // Check the main page heading for 404 text
    await expect(page.locator('h1')).toContainText(/not found|404/i);
  });
});
