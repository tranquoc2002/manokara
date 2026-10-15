import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  resolve: { preserveSymlinks: true },
  build: {
    outDir: 'outputs',
    emptyOutDir: false,
    minify: 'esbuild',
    lib: {
      entry: 'src/manokara-react.jsx',
      formats: ['es'],
      fileName: () => 'manokara-react.js'
    },
    rollupOptions: { external: [] }
  }
});
