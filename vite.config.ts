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
    
  },
  assetsInclude: ['**/*.html'],
});
