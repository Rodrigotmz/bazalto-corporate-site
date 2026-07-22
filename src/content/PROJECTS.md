# Proyectos de BAZALTO

Agrega cada caso como un archivo `.md` en `src/content/bazalto-projects/`. Usa Yina’s Boutique
como referencia para completar título, slug, resumen, categoría, estado, tecnologías, reto,
solución y funciones.

- `featured: true` lo muestra en la portada.
- `draft: true` evita que se genere públicamente.
- `externalUrl` y `repositoryUrl` son opcionales.
- `mediaStatus: provisional` identifica una captura pendiente de sustitución; elimina el campo al
  recibir la versión definitiva.

Guarda los originales locales y revisados por privacidad en `src/assets/projects/<slug>/`. Asigna
la captura con `featuredImage` y `featuredImageAlt`; asigna la identidad secundaria con `logo` y
`logoAlt`. Si faltan la imagen o su texto alternativo, `ProjectMedia.astro` conserva el fallback
`?` para ese proyecto.

Para sustituir la captura provisional de Yina’s Boutique, reemplaza el archivo
`yinas-boutique-01-storefront-desktop.png` sin cambiar la ruta y retira `mediaStatus`. Astro genera
las derivadas responsivas durante el build; no agregues copias optimizadas manualmente.
