import { test, expect } from '@playwright/test';

test.describe('Input Component', () => {
  test('renders input with placeholder', async ({ page }) => {
    await page.setContent(`
      <input id="test-input" type="text" placeholder="Enter your name" />
    `);
    
    const input = page.locator('#test-input');
    await expect(input).toBeVisible();
    await expect(input).toHaveAttribute('placeholder', 'Enter your name');
  });

  test('accepts user input', async ({ page }) => {
    await page.setContent(`
      <input id="test-input" type="text" />
    `);
    
    const input = page.locator('#test-input');
    await input.fill('John Doe');
    await expect(input).toHaveValue('John Doe');
  });

  test('input type email validates format', async ({ page }) => {
    await page.setContent(`
      <input id="test-input" type="email" />
    `);
    
    const input = page.locator('#test-input');
    await input.fill('test@example.com');
    await expect(input).toHaveValue('test@example.com');
  });

  test('input type number only accepts numbers', async ({ page }) => {
    await page.setContent(`
      <input id="test-input" type="number" />
    `);
    
    const input = page.locator('#test-input');
    await input.fill('123');
    await expect(input).toHaveValue('123');
  });
});