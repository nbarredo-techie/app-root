import { defineConfig } from 'vite';
import vitePluginSingleSpa  from 'vite-plugin-single-spa';

export default defineConfig({
  plugins: [
    vitePluginSingleSpa({
      type: 'root',
      importMaps:{
        type: 'overridable-importmap', // Changed from 'systemjs-importmap'
        build: 'src/importMap.json'
      },
      imo: '6.0.0', // import-map-overrides version
      imoUi: 'full',
    }),
  ],
  build: {
    target: 'esnext',
    rollupOptions: { 
      input: 'index.html', // Changed: index.html is now the main input
      output: {
        format: 'es', 
        entryFileNames: '[name].js', // This will apply to JS chunks, e.g., from bootstrap.js
        assetFileNames: 'assets/[name][ext]',
      },
      preserveEntrySignatures: 'strict',
      external: ['single-spa', 'single-spa-layout'] // Keep this, it's important
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext'
    }
  }
});
