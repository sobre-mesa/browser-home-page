import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        open: true,
        // proxy: {
        //     '/categories': {
        //         target: 'http://localhost:8000',
        //         changeOrigin: true,
        //     },
        //     '/notes': {
        //         target: 'http://localhost:8000',
        //         changeOrigin: true,
        //     },
        //     '/savedItems': {
        //         target: 'http://localhost:8000',
        //         changeOrigin: true,
        //     },
        // },
    },
    build: {
        outDir: 'build',
        sourcemap: true,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: 'src/setupTests',
        mockReset: true,
    },
});
