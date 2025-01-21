import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@lib', replacement: resolve(__dirname, 'src/lib') },
      { find: '@src', replacement: resolve(__dirname, 'src/src') },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
      { find: '@hooks', replacement: resolve(__dirname, 'src/hooks') },
    ],
    preserveSymlinks: true,
  },
});
