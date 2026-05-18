import { test, expect } from '@playwright/test';

test.describe('Profile Page', () => {
  test('redirects to login if not authenticated', async ({ page }) => {
    await page.goto('/profile');
    // Should redirect to login or show login form
    const loginForm = page.locator('form');
    const emailInput = page.locator('input[type="email"]');
    // Accept either the full login form or the email input being visible
    const loginVisible = await loginForm.isVisible().catch(() => false);
    const emailVisible = await emailInput.isVisible().catch(() => false);
    expect(loginVisible || emailVisible).toBeTruthy();
  });
});
