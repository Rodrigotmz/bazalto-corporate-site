import { expect, test } from '@playwright/test';

test.use({ colorScheme: 'dark' });

test('theme and mobile navigation stay explicit and accessible', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es-MX');

  const trigger = page.locator('[data-menu-open]');
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');

  await page.locator('#mobile-menu [data-theme-toggle]').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();

  await page.goto('/servicios');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('public routes render without mobile overflow', async ({ page }) => {
  for (const path of [
    '/',
    '/servicios',
    '/proyectos',
    '/proyectos/yinas-boutique',
    '/nosotros',
    '/contacto',
  ]) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(200);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      path
    ).toBeLessThanOrEqual(390);
  }

  await expect(page.locator('.disabled-control')).toHaveText('WhatsApp próximamente');
  await expect(page.locator('a.disabled-control')).toHaveCount(0);
});

test('project content and retired routes have the expected status', async ({ page, request }) => {
  await page.goto('/proyectos/yinas-boutique');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Yina’s Boutique');
  await expect(page.locator('.media-placeholder span[aria-hidden="true"]')).toHaveText('?');

  for (const path of ['/blog', '/about', '/contact']) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});
