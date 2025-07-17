import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    build: {
        rollupOptions: {
            input: 'tailwind.css',
            output: {
                assetFileNames: '[name].[ext]',
            },
        },
        outDir: 'website/assets',
    },
    plugins: [
        tailwindcss(),
        viteStaticCopy({
            targets: [
                {
                    src: 'src/**/*',
                    dest: './',
                },
            ],
        }),
    ],
})