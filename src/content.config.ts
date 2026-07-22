import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bazalto-projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    category: z.string(),
    status: z.string(),
    technologies: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    publishedAt: z.coerce.date(),
    externalUrl: z.url().optional(),
    repositoryUrl: z.url().optional(),
    media: z.array(z.string()).default([]),
    challenge: z.string(),
    solution: z.string(),
    features: z.array(z.string()),
  }),
});

export const collections = { projects };
