# TAVI Landing

Sitio público de TAVI Orders (`taviorders.com`): home, precios, soporte y
directorio de restaurantes. Es un proyecto separado de la aplicación
(`../frontend`, panel + menú QR en `{slug}.taviorders.com`).

## Stack

**TanStack Start** (React 19, SSR) + Vite + Tailwind 4, desplegado en Vercel
vía Nitro. Todas las páginas se renderizan en el servidor: el HTML inicial ya
trae title, meta, canonical, JSON-LD y contenido (lo que leen Google y los
previews de WhatsApp/Facebook, que no ejecutan JS).

- Rutas: `src/routes/*` (file-based; `src/routeTree.gen.ts` se genera solo).
- SEO por ruta: `head()` con los helpers de `src/lib/seo.ts`
  (`seo()`, `jsonLd()`, `breadcrumbLd()`); datos estructurados globales en
  `src/lib/structured-data.ts`.
- Rutas inexistentes responden **404** real (`notFoundComponent`); los
  alias usan redirect 301 desde el servidor (ver `src/routes/soporte.tsx`).

## Desarrollo

```bash
bun install
bun run dev        # http://localhost:5174
bun run check      # build + typecheck + lint + tests
```

## Variables de entorno

Copia `.env.example` a `.env`:

- `VITE_WEB3FORMS_ACCESS_KEY` — clave pública de [Web3Forms](https://web3forms.com)
  para el formulario "Solicitar demo" (`src/components/DemoModal.tsx`).
- `VITE_APP_URL` — URL base de la app TAVI (login/panel). Vacío = enlaces
  relativos (`/login`).

## Build y deploy

```bash
bun run build      # vite build -> .output/ (o .vercel/output/ en Vercel)
bun run preview    # sirve .output/server/index.mjs
```

En Vercel, Nitro detecta el entorno y genera `.vercel/output` (Build Output
API): una función SSR + estáticos, con `cache-control: immutable` para
`/assets/*`. Las páginas públicas envían `s-maxage=600,
stale-while-revalidate=86400` (`PUBLIC_PAGE_HEADERS`) para servirse desde el
CDN. No hace falta `vercel.json`.
