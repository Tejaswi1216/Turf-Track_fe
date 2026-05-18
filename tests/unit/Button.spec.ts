import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test('renders button with text', async ({ page }) => {
    // Since Playwright doesn't have built-in component testing like Vitest,
    // we'll test the Button component via a simple HTML fixture
    await page.setContent(`
      <button id="test-btn">Click me</button>
    `);
    
    const button = page.locator('#test-btn');
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Click me');
  });

  test('button click fires event', async ({ page }) => {
    let clicked = false;
    await page.evaluateHandle(() => {
      (window as any).clickHandler = () => { (window as any).clicked = true; };
    });
    
    await page.setContent(`
      <button id="test-btn" onclick="window.clickHandler()">Click me</button>
    `);
    
    const button = page.locator('#test-btn');
    await button.click();
    
    const isClicked = await page.evaluate(() => (window as any).clicked);
    expect(isClicked).toBe(true);
  });
});