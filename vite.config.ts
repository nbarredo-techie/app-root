import { defineConfig } from 'vite';
import singleSpa from 'vite-plugin-single-spa';

export default defineConfig({
  plugins: [
    singleSpa({
      type: 'root',
      imo: true,
      imoUi: 'full',
      importMaps: { 
        type: 'systemjs-importmap',
        dev: 'src/importMap.dev.json',
        build: 'src/importMap.json'
      }
    })
  ],
  build: {
    target: 'esnext',
    modulePreload: false,
    rollupOptions: { 
      output: {
        format: 'system',
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][ext]',
        globals: {
          'single-spa': 'singleSpa',
          'single-spa-layout': 'singleSpaLayout'
        }
      },
      preserveEntrySignatures: 'strict',
			external: ['single-spa', 'single-spa-layout']
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  }
});
