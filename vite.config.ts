import { defineConfig } from 'vite';
import singleSpa from 'vite-plugin-single-spa';

export default defineConfig({
  plugins: [
    singleSpa({
      type: 'root'
    }),
  ],
  build: {
    target: 'esnext',
    modulePreload: false,
    rollupOptions: {
      output: {
        format: 'system',
        entryFileNames: 'root-config.js',
      },
    },
  },
  assetsInclude: ['**/*.html'],
});
