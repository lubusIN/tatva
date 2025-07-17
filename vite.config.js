import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    build: {
        rollupOptions: {
            input: 'tailwind.css',
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'tailwind.css') return 'style.css';
                    return assetInfo.name;
                },
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