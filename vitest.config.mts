import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [
        react(),
        {
            name: 'mock-css',
            enforce: 'pre',
            transform(code, id) {
                if (id.endsWith('.css')) return 'export default {}';
            }
        }
    ],
    test: {
        environment: 'jsdom',
        setupFiles: ['./tests/boilerplate/setup.ts'],
        include: ['tests/boilerplate/**/*.test.{ts,tsx}'],
        globals: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
