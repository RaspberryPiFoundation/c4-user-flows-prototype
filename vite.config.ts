import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative base so the built site works when served from a GitHub Pages
  // project subpath (https://raspberrypifoundation.github.io/<repo>/) as well
  // as at root during local preview.
  base: './',
  server: { port: 5173, open: true },
})
