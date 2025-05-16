import { defineConfig } from 'vite';
import singleSpa from 'vite-plugin-single-spa';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    singleSpa({
      type: 'root',
      importMaps:{
        type: 'systemjs-importmap',
      },
      imo: true,
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
