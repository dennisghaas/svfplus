import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        eslintPlugin({
            cache: false,
            emitWarning: true,
            emitError: true,
            include: ['src/**/*.ts', 'src/**/*.vue', 'src/**/*.js'],
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import '@/styles/variables/index.scss';`,
            },
        },
    },
});
