import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
  ],
  build: {
    target: 'esnext',
    rollupOptions: { 
      input: 'src/root-config.ts', // Changed: Point to the actual entry file
      output: {
        format: 'system', 
        entryFileNames: 'bootstrap.js', // Changed: Output file name
        assetFileNames: 'assets/[name][ext]',
      },
      preserveEntrySignatures: 'strict',
      external: ['single-spa', 'single-spa-layout'] 
    },
    outDir: 'dist' // Explicitly set or ensure it defaults to dist
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext' // Match build target if necessary
    }
  }
});
