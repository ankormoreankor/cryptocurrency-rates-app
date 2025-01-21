import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@libs', replacement: resolve(__dirname, 'src/lib') },
    ],
    // {
    //   '@root': resolve(__dirname),
    //   '@src': resolve('src'),
    //   '@pages': resolve('src', 'pages'),
    //   '@components': resolve('src', 'components'),
    //   '@hooks': resolve('src', 'hooks'),
    // },
    preserveSymlinks: true,
  },
});
