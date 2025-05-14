import { defineConfig } from 'vite';
import singleSpa from 'vite-plugin-single-spa';
import federation from '@originjs/vite-plugin-federation';

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
  
  federation({
    name: 'root',
    remotes: {
      shared_ui: 'https://terrabostmanagestorage.blob.core.windows.net/$web/shared-ui/remoteEntry.js', // Update URL to match your deployment
    },
    shared: ['react', 'react-dom']
  })],
  build: {
    target: 'esnext',
    modulePreload: false,
    
  },
 
});
