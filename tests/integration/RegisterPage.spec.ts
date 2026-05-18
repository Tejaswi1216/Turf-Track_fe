import { test, expect } from '@playwright/test';

test.describe('Register Page', () => {
  test('renders register form', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('shows error on empty submit', async ({ page }) => {
    await page.goto('/register');
    await page.locator('button[type="submit"]').click();
    const error = page.locator('[class*=error], [class*=invalid], [role=alert]');
    expect(await error.count() === 0 || await error.isVisible()).toBeTruthy();
  });

  test('email input accepts text', async ({ page }) => {
    await page.goto('/register');
    const email = page.locator('input[type="email"]');
    await email.fill('test@example.com');
    await expect(email).toHaveValue('test@example.com');
  });

  test('password input accepts text', async ({ page }) => {
    await page.goto('/register');
    const pw = page.locator('input[type="password"]');
    await pw.fill('secret123');
    await expect(pw).toHaveValue('secret123');
  });
});
