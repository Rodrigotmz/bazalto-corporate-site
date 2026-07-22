# Proyectos de BAZALTO

Agrega cada caso como un archivo `.md` en `src/content/bazalto-projects/`. Usa el caso de
Yina’s Boutique como referencia para completar el título, slug, resumen, categoría, estado,
tecnologías, reto, solución y funciones.

- `featured: true` lo muestra en la portada.
- `draft: true` evita que se genere públicamente.
- `externalUrl` y `repositoryUrl` son opcionales y solo se muestran cuando tienen una URL.
- `media` queda vacío hasta recibir archivos reales del propietario.

Mientras no existan archivos reales, las páginas usan `ProjectMediaPlaceholder.astro`. Cuando
lleguen, colócalos localmente, registra sus rutas en `media` y sustituye el placeholder en la
tarjeta y el detalle del proyecto.
