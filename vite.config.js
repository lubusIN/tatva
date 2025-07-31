import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@tatva': path.resolve(__dirname, 'src/website'),
    },
  },
  assetsInclude: ['**/*.md'],
  optimizeDeps: {
    include: [
      '@wordpress/components',
      '@wordpress/compose',
      '@wordpress/icons',
      '@wordpress/i18n',
      'react-syntax-highlighter',
      'react-content-loader',
      'react-markdown',
      'remark-gfm',
      'markdown',
    ],
  },
  build: {
    outDir: 'build'
  },
  preview: {
    open: true,
  },
});
