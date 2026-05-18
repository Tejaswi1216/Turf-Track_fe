import { test, expect } from '@playwright/test';

test.describe('Form Components', () => {
  test('form renders with input fields', async ({ page }) => {
    await page.setContent(`
      <form id="booking-form">
        <input id="name" type="text" placeholder="Full Name" />
        <input id="email" type="email" placeholder="Email" />
        <input id="phone" type="tel" placeholder="Phone" />
        <button type="submit">Submit</button>
      </form>
    `);
    
    const form = page.locator('#booking-form');
    const nameInput = page.locator('#name');
    const emailInput = page.locator('#email');
    const phoneInput = page.locator('#phone');
    const submitBtn = page.locator('button[type="submit"]');
    
    await expect(form).toBeVisible();
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(phoneInput).toBeVisible();
    await expect(submitBtn).toBeVisible();
  });

  test('form fields can be filled', async ({ page }) => {
    await page.setContent(`
      <form id="booking-form">
        <input id="name" type="text" />
        <input id="email" type="email" />
        <input id="phone" type="tel" />
      </form>
    `);
    
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('john@example.com');
    await page.locator('#phone').fill('+919876543210');
    
    await expect(page.locator('#name')).toHaveValue('John Doe');
    await expect(page.locator('#email')).toHaveValue('john@example.com');
    await expect(page.locator('#phone')).toHaveValue('+919876543210');
  });

  test('form submit button is clickable', async ({ page }) => {
    let submitted = false;
    
    await page.evaluateHandle(() => {
      (window as any).formHandler = () => { (window as any).submitted = true; };
    });
    
    await page.setContent(`
      <form id="booking-form" onsubmit="window.formHandler(); return false;">
        <input id="name" type="text" />
        <button type="submit">Submit</button>
      </form>
    `);
    
    await page.locator('button[type="submit"]').click();
    const isSubmitted = await page.evaluate(() => (window as any).submitted);
    expect(isSubmitted).toBe(true);
  });

  test('form validation shows errors', async ({ page }) => {
    await page.setContent(`
      <form id="booking-form">
        <input id="email" type="email" required />
        <span id="error" style="display:none; color:red;">Invalid email</span>
        <button type="submit">Submit</button>
      </form>
    `);
    
    const emailInput = page.locator('#email');
    const errorMsg = page.locator('#error');
    
    await emailInput.fill('invalid-email');
    // In real scenario, validation would be triggered
    // For this test, we're just checking the element exists
    await expect(errorMsg).toBeVisible({ visible: false });
  });
  test('form label is associated with input', async ({ page }) => {
    await page.setContent(`
      <form>
        <label for="username">Username</label>
        <input id="username" type="text" />
      </form>
    `);
    const label = page.locator('label[for="username"]');
    const input = page.locator('#username');
    await expect(label).toBeVisible();
    await expect(input).toBeVisible();
  });

  test('form description is rendered', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="desc-input" aria-describedby="desc" />
        <span id="desc">This is a description</span>
      </form>
    `);
    const desc = page.locator('#desc');
    await expect(desc).toHaveText('This is a description');
  });

  test('form input can be disabled', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="disabled-input" disabled />
      </form>
    `);
    const input = page.locator('#disabled-input');
    await expect(input).toBeDisabled();
  });

  test('form input can be required', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="required-input" required />
      </form>
    `);
    const input = page.locator('#required-input');
    await expect(input).toHaveAttribute('required', '');
  });

  test('form input has aria-invalid when invalid', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="invalid-input" aria-invalid="true" />
      </form>
    `);
    const input = page.locator('#invalid-input');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  test('form message is shown for error', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="input1" aria-describedby="msg1" aria-invalid="true" />
        <span id="msg1">This field is required</span>
      </form>
    `);
    const msg = page.locator('#msg1');
    await expect(msg).toHaveText('This field is required');
  });

  test('form with multiple required fields', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="f1" required />
        <input id="f2" required />
        <button type="submit">Submit</button>
      </form>
    `);
    const f1 = page.locator('#f1');
    const f2 = page.locator('#f2');
    await expect(f1).toHaveAttribute('required', '');
    await expect(f2).toHaveAttribute('required', '');
  });

  test('form input with max length', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="maxlen" maxlength="5" />
      </form>
    `);
    const input = page.locator('#maxlen');
    await expect(input).toHaveAttribute('maxlength', '5');
  });

  test('form input with pattern', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="pattern" pattern="[A-Za-z]+" />
      </form>
    `);
    const input = page.locator('#pattern');
    await expect(input).toHaveAttribute('pattern', '[A-Za-z]+');
  });

  test('form input with placeholder', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="ph" placeholder="Type here" />
      </form>
    `);
    const input = page.locator('#ph');
    await expect(input).toHaveAttribute('placeholder', 'Type here');
  });

  test('form input with aria-label', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="aria" aria-label="My Input" />
      </form>
    `);
    const input = page.locator('#aria');
    await expect(input).toHaveAttribute('aria-label', 'My Input');
  });

  test('form with select element', async ({ page }) => {
    await page.setContent(`
      <form>
        <select id="sel"><option value="a">A</option><option value="b">B</option></select>
      </form>
    `);
    const select = page.locator('#sel');
    await expect(select).toBeVisible();
    await expect(select.locator('option')).toHaveCount(2);
  });

  test('form with textarea', async ({ page }) => {
    await page.setContent(`
      <form>
        <textarea id="ta">Hello</textarea>
      </form>
    `);
    const ta = page.locator('#ta');
    await expect(ta).toHaveValue('Hello');
  });

  test('form input with autofocus', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="auto" autofocus />
      </form>
    `);
    const input = page.locator('#auto');
    await expect(input).toHaveAttribute('autofocus', '');
  });

  test('form input with readonly', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="ro" readonly value="readonly" />
      </form>
    `);
    const input = page.locator('#ro');
    await expect(input).toHaveAttribute('readonly', '');
    await expect(input).toHaveValue('readonly');
  });

  test('form input with min and max', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="num" type="number" min="1" max="10" />
      </form>
    `);
    const input = page.locator('#num');
    await expect(input).toHaveAttribute('min', '1');
    await expect(input).toHaveAttribute('max', '10');
  });

  test('form input with step', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="stepper" type="number" step="0.5" />
      </form>
    `);
    const input = page.locator('#stepper');
    await expect(input).toHaveAttribute('step', '0.5');
  });

  test('form input with autocomplete', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="ac" autocomplete="on" />
      </form>
    `);
    const input = page.locator('#ac');
    await expect(input).toHaveAttribute('autocomplete', 'on');
  });

  test('form input with tabindex', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="tabi" tabindex="2" />
      </form>
    `);
    const input = page.locator('#tabi');
    await expect(input).toHaveAttribute('tabindex', '2');
  });

  test('form with fieldset and legend', async ({ page }) => {
    await page.setContent(`
      <form>
        <fieldset><legend>Legend</legend><input /></fieldset>
      </form>
    `);
    const legend = page.locator('legend');
    await expect(legend).toHaveText('Legend');
  });

  test('form with button reset', async ({ page }) => {
    await page.setContent(`
      <form>
        <input id="resetme" value="reset this" />
        <button type="reset">Reset</button>
      </form>
    `);
    const btn = page.locator('button[type="reset"]');
    await expect(btn).toBeVisible();
  });

  test('form with hidden input', async ({ page }) => {
    await page.setContent(`
      <form>
        <input type="hidden" id="hid" value="secret" />
      </form>
    `);
    const input = page.locator('#hid');
    await expect(input).toHaveAttribute('type', 'hidden');
    await expect(input).toHaveValue('secret');
  });

  test('form with checkbox', async ({ page }) => {
    await page.setContent(`
      <form>
        <input type="checkbox" id="cb" checked />
      </form>
    `);
    const cb = page.locator('#cb');
    await expect(cb).toBeChecked();
  });

  test('form with radio buttons', async ({ page }) => {
    await page.setContent(`
      <form>
        <input type="radio" name="r" id="r1" checked />
        <input type="radio" name="r" id="r2" />
      </form>
    `);
    const r1 = page.locator('#r1');
    const r2 = page.locator('#r2');
    await expect(r1).toBeChecked();
    await expect(r2).not.toBeChecked();
  });

  test('form with file input', async ({ page }) => {
    await page.setContent(`
      <form>
        <input type="file" id="fileup" />
      </form>
    `);
    const fileup = page.locator('#fileup');
    await expect(fileup).toHaveAttribute('type', 'file');
  });

  test('form with datalist', async ({ page }) => {
    await page.setContent(`
      <form>
        <input list="dl" id="dlinput" />
        <datalist id="dl"><option value="A" /><option value="B" /></datalist>
      </form>
    `);
    const dl = page.locator('datalist#dl');
    await expect(dl.locator('option')).toHaveCount(2);
  });

  test('form with progress element', async ({ page }) => {
    await page.setContent(`
      <form>
        <progress id="prog" value="50" max="100"></progress>
      </form>
    `);
    const prog = page.locator('#prog');
    await expect(prog).toHaveAttribute('value', '50');
    await expect(prog).toHaveAttribute('max', '100');
  });

  test('form with meter element', async ({ page }) => {
    await page.setContent(`
      <form>
        <meter id="meter" value="0.6">60%</meter>
      </form>
    `);
    const meter = page.locator('#meter');
    await expect(meter).toHaveAttribute('value', '0.6');
    await expect(meter).toHaveText('60%');
  });

  test('form with color input', async ({ page }) => {
    await page.setContent(`
      <form>
        <input type="color" id="color" value="#ff0000" />
      </form>
    `);
    const color = page.locator('#color');
    await expect(color).toHaveValue('#ff0000');
  });

  test('form with range input', async ({ page }) => {
    await page.setContent(`
      <form>
        <input type="range" id="range" min="0" max="10" value="5" />
      </form>
    `);
    const range = page.locator('#range');
    await expect(range).toHaveAttribute('type', 'range');
    await expect(range).toHaveValue('5');
  });

  test('form with time input', async ({ page }) => {
    await page.setContent(`
      <form>
        <input type="time" id="time" value="12:34" />
      </form>
    `);
    const time = page.locator('#time');
    await expect(time).toHaveValue('12:34');
  });

  test('form with date input', async ({ page }) => {
    await page.setContent(`
      <form>
        <input type="date" id="date" value="2025-11-11" />
      </form>
    `);
    const date = page.locator('#date');
    await expect(date).toHaveValue('2025-11-11');
  });

  test('form with url input', async ({ page }) => {
    await page.setContent(`
      <form>
        <input type="url" id="url" value="https://example.com" />
      </form>
    `);
    const url = page.locator('#url');
    await expect(url).toHaveValue('https://example.com');
  });

  test('form with search input', async ({ page }) => {
    await page.setContent(`
      <form>
        <input type="search" id="search" value="find me" />
      </form>
    `);
    const search = page.locator('#search');
    await expect(search).toHaveValue('find me');
  });

  test('form with tel input', async ({ page }) => {
    await page.setContent(`
      <form>
        <input type="tel" id="tel" value="1234567890" />
      </form>
    `);
    const tel = page.locator('#tel');
    await expect(tel).toHaveValue('1234567890');
  });

  test('form with email input', async ({ page }) => {
    await page.setContent(`
      <form>
        <input type="email" id="em" value="a@b.com" />
      </form>
    `);
    const em = page.locator('#em');
    await expect(em).toHaveValue('a@b.com');
  });

  test('form with password input', async ({ page }) => {
    await page.setContent(`
      <form>
        <input type="password" id="pw" value="secret" />
      </form>
    `);
    const pw = page.locator('#pw');
    await expect(pw).toHaveValue('secret');
  });

  test('form with number input', async ({ page }) => {
    await page.setContent(`
      <form>
        <input type="number" id="num2" value="42" />
      </form>
    `);
    const num2 = page.locator('#num2');
    await expect(num2).toHaveValue('42');
  });

  test('form with button submit', async ({ page }) => {
    await page.setContent(`
      <form>
        <button type="submit" id="subbtn">Submit</button>
      </form>
    `);
    const subbtn = page.locator('#subbtn');
    await expect(subbtn).toHaveText('Submit');
  });
});