import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import path from "node:path";

// SSR con TanStack Start. Nitro detecta Vercel en el build (env VERCEL) y
// genera la salida `.vercel/output` con funciones + estáticos; en local
// produce `.output/` (servible con `bun run preview` / `node .output/server/index.mjs`).
export default defineConfig({
  plugins: [tailwindcss(), tanstackStart({ srcDirectory: "src" }), nitro(), react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  server: {
    port: 5174,
  },
});
