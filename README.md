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

`public/_redirects` habilita el fallback de SPA (Cloudflare Pages / Netlify)
para que rutas como `/support` respondan `index.html` en producción.
