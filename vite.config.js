import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { cpSync } from 'node:fs';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/iara-games/',
  plugins: [
    react(),
    {
      name: 'copy-existing-assets',
      closeBundle() {
        cpSync('assets', 'dist/assets', { recursive: true });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        home: resolve('index.html'),
        loja: resolve('pages/loja.html'),
        cadastro: resolve('pages/cadastro.html'),
        perfil: resolve('pages/perfil.html'),
        biblioteca: resolve('pages/biblioteca.html'),
      },
    },
  },
});
