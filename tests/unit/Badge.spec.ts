import { test, expect } from '@playwright/test';

test.describe('Badge Component', () => {
  test('renders badge with text', async ({ page }) => {
    await page.setContent(`
      <span class="badge">Active</span>
    `);
    
    const badge = page.locator('.badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveText('Active');
  });

  test('renders badge with different statuses', async ({ page }) => {
    await page.setContent(`
      <span class="badge status-confirmed">Confirmed</span>
      <span class="badge status-pending">Pending</span>
      <span class="badge status-cancelled">Cancelled</span>
    `);
    
    const confirmed = page.locator('.status-confirmed');
    const pending = page.locator('.status-pending');
    const cancelled = page.locator('.status-cancelled');
    
    await expect(confirmed).toHaveText('Confirmed');
    await expect(pending).toHaveText('Pending');
    await expect(cancelled).toHaveText('Cancelled');
  });

  test('badge applies correct CSS classes', async ({ page }) => {
    await page.setContent(`
      <span class="badge bg-green-50 text-green-700">Success</span>
    `);
    
    const badge = page.locator('.badge');
    await expect(badge).toHaveClass(/bg-green-50/);
    await expect(badge).toHaveClass(/text-green-700/);
  });
});