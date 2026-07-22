import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const site = import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, '');
  const sitemap = site ? `\nSitemap: ${site}/sitemap-index.xml` : '';
  return new Response(`User-agent: *\nAllow: /${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
