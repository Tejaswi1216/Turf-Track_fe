import { test, expect } from '@playwright/test';

test.describe('Index Page', () => {

  test('renders hero section', async ({ page }) => {
    await page.goto('/');
    // Use a more robust selector for the hero heading
    const hero = page.locator('h1');
    await expect(hero).toContainText('Book premium sports turfs');
  });

  test('renders search input', async ({ page }) => {
    await page.goto('/');
    // The actual placeholder is 'Search by name, location or amenity'
    await expect(page.locator('input[placeholder*="Search by name"]')).toBeVisible();
  });

  test('renders price filter', async ({ page }) => {
    await page.goto('/');
    // There are multiple labels, so check at least one contains 'Price'
    const labels = page.locator('label');
    const count = await labels.count();
    let found = false;
    for (let i = 0; i < count; i++) {
      const text = await labels.nth(i).textContent();
      if (text && text.includes('Price')) found = true;
    }
    expect(found).toBe(true);
  });

  test('renders Explore turfs button', async ({ page }) => {
    await page.goto('/');
    // There are multiple buttons, check one contains 'Explore turfs'
    const btns = page.locator('button');
    const count = await btns.count();
    let found = false;
    for (let i = 0; i < count; i++) {
      const text = await btns.nth(i).textContent();
      if (text && text.includes('Explore turfs')) found = true;
    }
    expect(found).toBe(true);
  });

  test('renders How it works button', async ({ page }) => {
    await page.goto('/');
    const btns = page.locator('button');
    const count = await btns.count();
    let found = false;
    for (let i = 0; i < count; i++) {
      const text = await btns.nth(i).textContent();
      if (text && text.includes('How it works')) found = true;
    }
    expect(found).toBe(true);
  });

  test('renders All Turfs heading', async ({ page }) => {
    await page.goto('/');
    // There may be multiple h2s, check for one with the right text
    const h2s = page.locator('h2');
    const count = await h2s.count();
    let found = false;
    for (let i = 0; i < count; i++) {
      const text = await h2s.nth(i).textContent();
      if (text && (/All Turfs/i.test(text) || /Turfs near/i.test(text))) found = true;
    }
    expect(found).toBe(true);
  });

  test('shows loading spinner when loading', async ({ page }) => {
    await page.goto('/');
    // The spinner is present in the DOM during loading
    // Wait for at least one .animate-spin to appear
    await expect(page.locator('.animate-spin').first()).toBeVisible();
  });

  test('renders at least two filter sections', async ({ page }) => {
    await page.goto('/');
    // Playwright does not have toHaveCountGreaterThan, so check count >= 2
    const sections = page.locator('section');
    const count = await sections.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });
});
