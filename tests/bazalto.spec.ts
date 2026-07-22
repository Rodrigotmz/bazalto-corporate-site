import { expect, test } from '@playwright/test';

test.use({ colorScheme: 'dark' });

test('theme and mobile navigation stay explicit and accessible', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es-MX');

  const trigger = page.locator('[data-menu-open]');
  await expect(trigger).toHaveAccessibleName('Abrir menú');
  await expect(trigger.locator('svg')).toHaveAttribute('aria-hidden', 'true');
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('[data-menu-close]')).toHaveAccessibleName('Cerrar menú');

  const themeToggle = page.locator('#mobile-menu [data-theme-toggle]');
  await expect(themeToggle).toHaveAccessibleName('Activar tema oscuro');
  await expect(themeToggle).toHaveAttribute('aria-pressed', 'false');
  await themeToggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(themeToggle).toHaveAccessibleName('Activar tema claro');
  await expect(themeToggle).toHaveAttribute('aria-pressed', 'true');

  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();

  await page.goto('/servicios');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('public routes render without mobile overflow', async ({ page }) => {
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('requestfailed', (request) => failedRequests.push(request.url()));

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
  const facebook = page.getByRole('link', { name: 'Abrir Facebook de BAZALTO' });
  await expect(facebook).toHaveAttribute('href', 'https://www.facebook.com/bazaltosoftware');
  await expect(facebook).toHaveAttribute('target', '_blank');
  await expect(facebook).toHaveAttribute('rel', 'noopener noreferrer');
  expect(consoleErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});

test('project content and retired routes have the expected status', async ({ page, request }) => {
  await page.goto('/proyectos/yinas-boutique');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Yina’s Boutique');
  await expect(page.locator('.media-placeholder span[aria-hidden="true"]')).toHaveText('?');
  await expect(page.locator('svg.lucide:not([aria-hidden="true"])')).toHaveCount(0);

  for (const path of ['/blog', '/about', '/contact']) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});
