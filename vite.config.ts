import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true
  },
  preview: {
    port: 3000,
    strictPort: true
  },
  resolve: {
    alias: [
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components')
      },
      {
        find: '@pages',
        replacement: path.resolve(__dirname, 'src/pages')
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, 'src/constants')
      },
      {
        find: '@interfaces',
        replacement: path.resolve(__dirname, 'src/interfaces')
      },
      {
        find: '@states',
        replacement: path.resolve(__dirname, 'src/states')
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, 'src/utils')
      },
      {
        find: '@services',
        replacement: path.resolve(__dirname, 'src/services')
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, 'src/hooks')
      }
    ]
  }
});
