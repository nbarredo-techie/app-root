import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
  ],
  build: {
    target: 'esnext', // Or consider 'es2020' or older if SystemJS compatibility is an issue with very new features
    rollupOptions: { 
      input: 'index.html', 
      output: {
        format: 'system', // Changed to SystemJS format
        entryFileNames: '[name].js', 
        assetFileNames: 'assets/[name][ext]',
      },
      preserveEntrySignatures: 'strict',
      external: ['single-spa', 'single-spa-layout'] 
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext' // Match build target if necessary
    }
  }
});
