import { defineConfig } from 'vite';
import singleSpa from 'vite-plugin-single-spa';

export default defineConfig({
  plugins: [
    singleSpa({
      type: 'root',
      importMaps: { 
        build:'src/importMap.json'
      }
    }),
  ],
  build: {
    target: 'esnext',
    modulePreload: false,
    
  },
 
});
