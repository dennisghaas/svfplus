// vite.config.ts
import { defineConfig } from 'file:///Users/haasd/Documents/svfplus/node_modules/vite/dist/node/index.js';
import vue from 'file:///Users/haasd/Documents/svfplus/node_modules/@vitejs/plugin-vue/dist/index.mjs';
import path from 'path';
import eslintPlugin from 'file:///Users/haasd/Documents/svfplus/node_modules/vite-plugin-eslint/dist/index.mjs';
var __vite_injected_original_dirname = '/Users/haasd/Documents/svfplus';
var vite_config_default = defineConfig({
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
      '@': path.resolve(__vite_injected_original_dirname, './src'),
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
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaGFhc2QvRG9jdW1lbnRzL3N2ZnBsdXNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9oYWFzZC9Eb2N1bWVudHMvc3ZmcGx1cy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvaGFhc2QvRG9jdW1lbnRzL3N2ZnBsdXMvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIGVzbGludFBsdWdpbih7XG4gICAgICBjYWNoZTogZmFsc2UsXG4gICAgICBlbWl0V2FybmluZzogdHJ1ZSxcbiAgICAgIGVtaXRFcnJvcjogdHJ1ZSxcbiAgICAgIGluY2x1ZGU6IFsnc3JjLyoqLyoudHMnLCAnc3JjLyoqLyoudnVlJywgJ3NyYy8qKi8qLmpzJ10sXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBzY3NzOiB7XG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCAnQC9zdHlsZXMvdmFyaWFibGVzL2luZGV4LnNjc3MnO2AsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFEsU0FBUyxvQkFBb0I7QUFDelMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sVUFBVTtBQUVqQixPQUFPLGtCQUFrQjtBQUp6QixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixhQUFhO0FBQUEsTUFDWCxPQUFPO0FBQUEsTUFDUCxhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxTQUFTLENBQUMsZUFBZSxnQkFBZ0IsYUFBYTtBQUFBLElBQ3hELENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
