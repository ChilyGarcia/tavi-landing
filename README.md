# TAVI Landing

Landing page pública de TAVI (`/` y `/support`), separada de la aplicación
(`../frontend`, que ahora arranca en `/login`).

## Desarrollo

```bash
bun install
bun run dev      # http://localhost:5174
```

## Variables de entorno

Copia `.env.example` a `.env`:

- `VITE_WEB3FORMS_ACCESS_KEY` — clave pública de [Web3Forms](https://web3forms.com)
  usada por el formulario "Solicitar demo" (`src/components/DemoModal.tsx`) para
  enviar el correo directamente desde el navegador, sin backend propio.
- `VITE_APP_URL` — URL base de la app TAVI (login/panel). Vacío = enlaces
  relativos (`/login`), útil si landing y app comparten dominio detrás de un
  proxy inverso. En desarrollo local con ambos proyectos corriendo por
  separado, apunta al dev server de `../frontend` (por defecto
  `http://localhost:3000`).

## Build

```bash
bun run build   # genera dist/
bun run preview
```

`public/_redirects` habilita el fallback de SPA en Cloudflare Pages/Netlify.
El despliegue actual es en **Vercel**, que no lee ese archivo: el fallback
para rutas como `/support` lo da `vercel.json` (rewrite `/(.*)` →
`/index.html`). Vercel sirve primero cualquier archivo que exista en
`dist/` (assets, `robots.txt`, `sitemap.xml`, etc.), así que el rewrite
solo actúa sobre rutas que no son archivos reales.

## SEO técnico

- **Salida estática**: `vite build` ya genera un sitio 100% estático en
  `dist/` (HTML + JS + CSS + assets), sin servidor ni SSR. No hay
  equivalente a `output: 'export'` que configurar porque este proyecto usa
  Vite, no Next.js — es el comportamiento por defecto.
- **`sitemap.xml`**: se genera automáticamente antes de cada build
  (`scripts/generate-sitemap.mjs`, hook `prebuild`) y termina en
  `dist/sitemap.xml`. Solo lista páginas reales (`/`, `/support`); las
  secciones ancla del home (`#features`, `#pricing`, `#how`, `#showcase`)
  no se listan aparte porque los rastreadores ignoran el fragmento y es la
  misma URL/documento. Si agregas una página nueva, súmala al array
  `routes` del script. El dominio usado es `https://taviorders.com`
  (override con la env var `SITE_URL`).
- **`robots.txt`**: en `public/robots.txt`, permite todo el rastreo y
  apunta al sitemap.
