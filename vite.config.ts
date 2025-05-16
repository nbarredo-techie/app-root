import { defineConfig } from 'vite';
import vitePluginSingleSpa  from 'vite-plugin-single-spa';
import { viteStaticCopy } from 'vite-plugin-static-copy';

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
    viteStaticCopy({
      targets: [
        { src: 'index.html', dest: '.' }
      ]
    })
  ],
  build: {
    target: 'esnext',
    modulePreload: false,
    rollupOptions: { 
      input: {
        bootstrap: './src/bootstrap.js'
      },
      output: {
        format: 'es', // Changed from 'system'
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][ext]',
        // Removed globals section
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
