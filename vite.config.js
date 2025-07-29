import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@tatva': path.resolve(__dirname, 'src/docs'),
    },
  },
  assetsInclude: ['**/*.md'],
  optimizeDeps: {
    include: [
      '@wordpress/components',
      '@wordpress/compose',
      '@wordpress/icons',
      '@wordpress/i18n',
    ],
  },
  build: {
    outDir: 'build'
  },
});
