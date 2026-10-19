import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative asset URLs work for both a custom domain and GitHub Pages project URLs.
export default defineConfig({
  plugins: [react()],
  base: './',
});
