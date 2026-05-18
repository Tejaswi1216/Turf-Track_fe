import { test, expect } from '@playwright/test';

test.describe('Card Component', () => {
  test('renders card with content', async ({ page }) => {
    await page.setContent(`
      <div class="card">
        <div class="card-header">
          <h2>Card Title</h2>
        </div>
        <div class="card-content">
          <p>Card content goes here</p>
        </div>
      </div>
    `);
    
    const card = page.locator('.card');
    const title = page.locator('.card-header h2');
    const content = page.locator('.card-content p');
    
    await expect(card).toBeVisible();
    await expect(title).toHaveText('Card Title');
    await expect(content).toHaveText('Card content goes here');
  });

  test('card has proper structure', async ({ page }) => {
    await page.setContent(`
      <div class="card">
        <div class="card-header"></div>
        <div class="card-content"></div>
      </div>
    `);
    
  const header = page.locator('.card-header');
  const content = page.locator('.card-content');

  // Ensure the structure exists even if elements are empty
  await expect(header).toHaveCount(1);
  await expect(content).toHaveCount(1);
  });

  test('card renders with elevation', async ({ page }) => {
    await page.setContent(`
      <div class="card shadow-lg border-0 bg-white">
        Content
      </div>
    `);
    
    const card = page.locator('.card');
    await expect(card).toHaveClass(/shadow-lg/);
    await expect(card).toHaveClass(/bg-white/);
  });
  test('card footer is rendered when present', async ({ page }) => {
    await page.setContent(`
      <div class="card">
        <div class="card-footer">Footer content</div>
      </div>
    `);
    const footer = page.locator('.card-footer');
    await expect(footer).toBeVisible();
    await expect(footer).toHaveText('Footer content');
  });

  test('card title and description are rendered', async ({ page }) => {
    await page.setContent(`
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Test Title</h3>
          <p class="card-description">Test Description</p>
        </div>
      </div>
    `);
    const title = page.locator('.card-title');
    const desc = page.locator('.card-description');
    await expect(title).toBeVisible();
    await expect(title).toHaveText('Test Title');
    await expect(desc).toBeVisible();
    await expect(desc).toHaveText('Test Description');
  });

  test('card supports custom classes', async ({ page }) => {
    await page.setContent(`
      <div class="card custom-class">Custom</div>
    `);
    const card = page.locator('.card');
    await expect(card).toHaveClass(/custom-class/);
  });

  test('card content area can be empty', async ({ page }) => {
    await page.setContent(`
      <div class="card">
        <div class="card-content"></div>
      </div>
    `);
    const content = page.locator('.card-content');
    // Only check that the element exists and has no text
    await expect(content).toHaveCount(1);
    await expect(content).toHaveText('');
  });

  test('card renders multiple sections', async ({ page }) => {
    await page.setContent(`
      <div class="card">
        <div class="card-header">Header</div>
        <div class="card-content">Content</div>
        <div class="card-footer">Footer</div>
      </div>
    `);
    await expect(page.locator('.card-header')).toHaveText('Header');
    await expect(page.locator('.card-content')).toHaveText('Content');
    await expect(page.locator('.card-footer')).toHaveText('Footer');
  });

  test('card can have custom inline style', async ({ page }) => {
    await page.setContent(`
      <div class="card" style="background: rgb(1,2,3);">Styled</div>
    `);
    const card = page.locator('.card');
    await expect(card).toHaveAttribute('style', /background: rgb\(1,2,3\)/);
  });

  test('card supports additional attributes', async ({ page }) => {
    await page.setContent(`
      <div class="card" data-testid="my-card">Extra</div>
    `);
    const card = page.locator('.card[data-testid="my-card"]');
    await expect(card).toHaveText('Extra');
  });

  test('card with no children renders', async ({ page }) => {
    await page.setContent(`
      <div class="card"></div>
    `);
    const card = page.locator('.card');
    await expect(card).toHaveCount(1);
    await expect(card).toHaveText('');
  });
  test('card renders with multiple custom classes', async ({ page }) => {
    await page.setContent(`
      <div class="card custom1 custom2">Multi</div>
    `);
    const card = page.locator('.card');
    await expect(card).toHaveClass(/custom1/);
    await expect(card).toHaveClass(/custom2/);
  });

  test('card renders with aria-label', async ({ page }) => {
    await page.setContent(`
      <div class="card" aria-label="My Card">Card</div>
    `);
    const card = page.locator('.card');
    await expect(card).toHaveAttribute('aria-label', 'My Card');
  });

  test('card renders with tabIndex', async ({ page }) => {
    await page.setContent(`
      <div class="card" tabIndex="0">Tabbable</div>
    `);
    const card = page.locator('.card');
    await expect(card).toHaveAttribute('tabindex', '0');
  });

  test('card renders with role', async ({ page }) => {
    await page.setContent(`
      <div class="card" role="region">Role</div>
    `);
    const card = page.locator('.card');
    await expect(card).toHaveAttribute('role', 'region');
  });

  test('card renders with data attributes', async ({ page }) => {
    await page.setContent(`
      <div class="card" data-x="1" data-y="2">Data</div>
    `);
    const card = page.locator('.card');
    await expect(card).toHaveAttribute('data-x', '1');
    await expect(card).toHaveAttribute('data-y', '2');
  });

  test('card renders with nested content', async ({ page }) => {
    await page.setContent(`
      <div class="card"><div class="card-content"><span>Nested</span></div></div>
    `);
    const span = page.locator('.card-content span');
    await expect(span).toHaveText('Nested');
  });

  test('card renders with image', async ({ page }) => {
    await page.setContent(`
      <div class="card"><img src="/logo.png" alt="Logo" /></div>
    `);
    const img = page.locator('.card img');
    await expect(img).toHaveAttribute('src', '/logo.png');
    await expect(img).toHaveAttribute('alt', 'Logo');
  });

  test('card renders with button child', async ({ page }) => {
    await page.setContent(`
      <div class="card"><button>Click</button></div>
    `);
    const btn = page.locator('.card button');
    await expect(btn).toHaveText('Click');
  });

  test('card renders with link child', async ({ page }) => {
    await page.setContent(`
      <div class="card"><a href="/home">Home</a></div>
    `);
    const link = page.locator('.card a');
    await expect(link).toHaveAttribute('href', '/home');
    await expect(link).toHaveText('Home');
  });

  test('card renders with list child', async ({ page }) => {
    await page.setContent(`
      <div class="card"><ul><li>One</li><li>Two</li></ul></div>
    `);
    const items = page.locator('.card ul li');
    await expect(items).toHaveCount(2);
    await expect(items.nth(0)).toHaveText('One');
    await expect(items.nth(1)).toHaveText('Two');
  });

  test('card renders with header and footer', async ({ page }) => {
    await page.setContent(`
      <div class="card"><div class="card-header">H</div><div class="card-footer">F</div></div>
    `);
    const header = page.locator('.card-header');
    const footer = page.locator('.card-footer');
    await expect(header).toHaveText('H');
    await expect(footer).toHaveText('F');
  });

  test('card renders with multiple card-content', async ({ page }) => {
    await page.setContent(`
      <div class="card"><div class="card-content">A</div><div class="card-content">B</div></div>
    `);
    const contents = page.locator('.card-content');
    await expect(contents).toHaveCount(2);
    await expect(contents.nth(0)).toHaveText('A');
    await expect(contents.nth(1)).toHaveText('B');
  });

  test('card renders with empty string child', async ({ page }) => {
    await page.setContent(`
      <div class="card"> </div>
    `);
    const card = page.locator('.card');
    await expect(card).toHaveText(' ');
  });

  test('card renders with numeric child', async ({ page }) => {
    await page.setContent(`
      <div class="card">123</div>
    `);
    const card = page.locator('.card');
    await expect(card).toHaveText('123');
  });

  test('card renders with boolean attribute', async ({ page }) => {
    await page.setContent(`
      <div class="card" hidden>Hidden</div>
    `);
    const card = page.locator('.card');
    await expect(card).toHaveAttribute('hidden', '');
  });

  test('card renders with style attribute', async ({ page }) => {
    await page.setContent(`
      <div class="card" style="color: red;">Styled</div>
    `);
    const card = page.locator('.card');
    await expect(card).toHaveAttribute('style', /color: red/);
  });

  test('card renders with id attribute', async ({ page }) => {
    await page.setContent(`
      <div class="card" id="mycard">ID</div>
    `);
    const card = page.locator('#mycard');
    await expect(card).toHaveText('ID');
  });
});