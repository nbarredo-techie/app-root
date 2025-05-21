import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
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
