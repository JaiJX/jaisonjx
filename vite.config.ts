import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom domain (jaisonjx.me) serves from the root, so base is '/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: {
        // Main portfolio SPA.
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        // Standalone "De Beauvoir · Three Lenses" page. Not linked anywhere in
        // the site — reachable only by visiting /projects/bible/ directly.
        // Built as its own entry so its global CSS stays isolated from the
        // portfolio.
        bible: fileURLToPath(new URL('./projects/bible/index.html', import.meta.url)),
      },
    },
  },
})
