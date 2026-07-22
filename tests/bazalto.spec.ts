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
  const desktopThemeToggle = page.locator('.header-actions > [data-theme-toggle]');
  await expect(themeToggle).toHaveAccessibleName('Activar tema oscuro');
  await expect(themeToggle).toHaveRole('switch');
  await expect(themeToggle).toHaveAttribute('aria-checked', 'false');
  const switchSize = await themeToggle.locator('.theme-track').boundingBox();

  await themeToggle.focus();
  await page.keyboard.press('Space');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(themeToggle).toHaveAccessibleName('Activar tema claro');
  await expect(themeToggle).toHaveAttribute('aria-checked', 'true');
  await expect(desktopThemeToggle).toHaveAttribute('aria-checked', 'true');

  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(themeToggle).toHaveAttribute('aria-checked', 'false');
  await expect(desktopThemeToggle).toHaveAttribute('aria-checked', 'false');
  expect(await themeToggle.locator('.theme-track').boundingBox()).toEqual(switchSize);

  await themeToggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();

  await page.goto('/terminos-y-condiciones');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('public routes render without mobile overflow', async ({ page }) => {
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];
  const imageRequests: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('requestfailed', (request) => failedRequests.push(request.url()));
  page.on('request', (request) => {
    if (request.resourceType() === 'image') imageRequests.push(request.url());
  });

  for (const path of [
    '/',
    '/servicios',
    '/proyectos',
    '/proyectos/yinas-boutique',
    '/nosotros',
    '/contacto',
    '/terminos-y-condiciones',
  ]) {
    const response = await page.goto(path, { waitUntil: 'networkidle' });
    expect(response?.status(), path).toBe(200);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
      path
    ).toBeLessThanOrEqual(390);
  }

  await page.goto('/contacto');
  await expect(page.locator('.disabled-control')).toHaveText('WhatsApp próximamente');
  await expect(page.locator('a.disabled-control')).toHaveCount(0);
  const facebook = page.getByRole('link', { name: 'Abrir Facebook de BAZALTO' });
  await expect(facebook).toHaveAttribute('href', 'https://www.facebook.com/bazaltosoftware');
  await expect(facebook).toHaveAttribute('target', '_blank');
  await expect(facebook).toHaveAttribute('rel', 'noopener noreferrer');
  expect(consoleErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
  expect(imageRequests.every((url) => url.startsWith('http://127.0.0.1:4321/'))).toBe(true);

  await expect(
    page.getByRole('link', { name: 'Términos y condiciones', exact: true })
  ).toHaveAttribute('href', '/terminos-y-condiciones');
});

test('project content and retired routes have the expected status', async ({ page, request }) => {
  const storefrontAlt = 'Vista de escritorio del catálogo público de Yina’s Boutique.';
  const logoAlt = 'Logotipo de Yina’s Boutique con identidad floral en tonos rosados.';
  const coverAlt =
    'Persona desarrollando software en una computadora portátil junto a una ventana.';

  await page.goto('/');
  await expect(
    page.locator('.project-card').getByRole('img', { name: storefrontAlt })
  ).toBeVisible();
  await expect(page.locator('.project-card .media-placeholder')).toHaveCount(0);
  await expect(page.getByRole('img', { name: coverAlt })).toBeVisible();
  await expect(page.locator('[data-studio-cover] figcaption')).toHaveText(
    'Soluciones que toman forma desde una necesidad concreta.'
  );

  await page.goto('/proyectos');
  await expect(
    page.locator('.project-card').getByRole('img', { name: storefrontAlt })
  ).toBeVisible();
  await expect(page.locator('.project-card .media-placeholder')).toHaveCount(0);

  await page.goto('/proyectos/yinas-boutique');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Yina’s Boutique');
  await expect(page.getByRole('img', { name: storefrontAlt })).toBeVisible();
  await expect(page.getByRole('img', { name: logoAlt })).toBeVisible();
  await expect(page.locator('[data-project-media="detail"] figcaption')).toHaveAttribute(
    'aria-hidden',
    'true'
  );
  await expect(page.locator('.media-placeholder')).toHaveCount(0);
  await expect(page.locator('svg.lucide:not([aria-hidden="true"])')).toHaveCount(0);

  for (const path of ['/blog', '/about', '/contact']) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test('terms render all sections without unresolved or fabricated data', async ({ page }) => {
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('requestfailed', (request) => failedRequests.push(request.url()));

  await page.setViewportSize({ width: 360, height: 800 });
  const response = await page.goto('/terminos-y-condiciones', { waitUntil: 'networkidle' });
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle('Términos y condiciones | Bazalto');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Términos y condiciones');

  const sectionHeadings = page.locator('.legal-document h2');
  await expect(sectionHeadings).toHaveCount(33);
  await expect(sectionHeadings.first()).toHaveText('1. Identidad del prestador');
  await expect(sectionHeadings.last()).toHaveText('33. Contacto');
  await expect(page.locator('[data-legal-last-updated]')).toHaveText(
    'Última actualización: 21 de julio de 2026'
  );
  await expect(page.getByText('Entrada en vigor', { exact: false })).toHaveCount(0);

  const legalText = await page.locator('main').innerText();
  expect(legalText).not.toMatch(/\[[A-ZÁÉÍÓÚÑ0-9 _/,-]+\]/);
  for (const marker of [
    'FECHA DE PUBLICACIÓN',
    'NOMBRE COMPLETO DE LA PERSONA FÍSICA',
    'DOMICILIO COMPLETO',
    'CORREO DE CONTACTO',
    'TELÉFONO O WHATSAPP',
    'DOMINIO OFICIAL',
    'MUNICIPIO, ESTADO DE HIDALGO',
    'HORARIO Y ZONA HORARIA',
  ]) {
    expect(legalText).not.toContain(marker);
  }
  expect(legalText).not.toMatch(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);
  expect(legalText).not.toContain('RFC:');
  await expect(page.locator('a[href^="mailto:"], a[href^="tel:"], a[href*="wa.me"]')).toHaveCount(
    0
  );

  const facebook = page.getByRole('link', {
    name: 'Página oficial de Bazalto en Facebook',
  });
  await expect(facebook).toHaveAttribute('href', 'https://www.facebook.com/bazaltosoftware');
  await expect(facebook).toHaveAttribute('target', '_blank');
  await expect(facebook).toHaveAttribute('rel', /noopener/);
  await expect(facebook).toHaveAttribute('rel', /noreferrer/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);

  await page.goto('/');
  await page.getByRole('link', { name: 'Términos y condiciones', exact: true }).click();
  await expect(page).toHaveURL(/\/terminos-y-condiciones$/);
  expect(consoleErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});
