import { defineConfig } from 'vite';
import singleSpa from 'vite-plugin-single-spa';

export default defineConfig({
  plugins: [
    singleSpa({
      type: 'root',
      imo:true,
      imoUi: 'full' ,
      importMaps: { 
        type:'systemjs-importmap',
        dev:  'src/importMap.dev.json',
        build:'src/importMap.json'
      }
    }),
  ],
  build: {
    target: 'esnext',
    modulePreload: false,
    
  },
 
});
