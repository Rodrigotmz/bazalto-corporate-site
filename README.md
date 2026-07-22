# Bazalto Web

Sitio web oficial de BAZALTO, marca de software y soluciones digitales. Es un proyecto Astro
completamente estático, en español de México y preparado para desplegarse en Vercel. No incluye
backend, base de datos, autenticación ni formularios de envío.

## Requisitos

- Node.js 22.12 o posterior
- pnpm

## Comandos

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm validate
pnpm test:e2e
```

`pnpm validate` ejecuta formato, lint, Astro Check, pruebas unitarias y build. Las pruebas E2E se
mantienen separadas porque necesitan iniciar un navegador y el servidor de vista previa.

## Configuración

La información editable del sitio vive en `src/config/site.config.ts`:

- Facebook está activo con la URL oficial.
- WhatsApp se habilita añadiendo el número y mensaje opcional, y cambiando `enabled` a `true`.
- El correo es opcional y permanece deshabilitado mientras no exista una dirección confirmada.
- `PUBLIC_SITE_URL` define el dominio usado por canonical y sitemap; es opcional localmente.

Copia `.env.example` a `.env` únicamente cuando necesites definir el dominio público.

## Proyectos

Los casos se guardan en `src/content/bazalto-projects/`. Consulta `src/content/PROJECTS.md` para
agregar proyectos, mantener borradores y preparar medios futuros.

## Tema

El sitio acepta exclusivamente `light` y `dark`. La selección se guarda en `bazalto-theme`, la
primera visita usa explícitamente el tema claro y la preferencia del sistema operativo no controla
el sitio.

## Medios

Hasta recibir capturas reales del propietario, todas las áreas de proyecto usan el componente
reutilizable con `?`. No se emplean imágenes remotas ni contenido generado.

## Despliegue

Vercel puede detectar Astro, ejecutar `pnpm build` y publicar la salida estática de `dist/`. No se
requiere adaptador de servidor ni variables obligatorias para compilar.

## Licencia y procedencia

Se conserva la licencia MIT del repositorio. La base inicial del proyecto se derivó de Astro Rocket;
la implementación pública y la arquitectura activa pertenecen al sitio Bazalto.
