import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL?.replace(/\/$/, '');

export default defineConfig({
  output: 'static',
  ...(site ? { site } : {}),
  compressHTML: true,
  build: { inlineStylesheets: 'always' },
  integrations: site ? [sitemap()] : [],
});
