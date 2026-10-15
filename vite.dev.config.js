import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve, sep } from 'node:path';

const projectRoot = resolve(import.meta.dirname);
const outputRoot = resolve(projectRoot, 'outputs');
const sourceRoot = resolve(projectRoot, 'src');
const devPort = Number(process.env.MANOKARA_VITE_PORT || 5173);
const backendOrigin = process.env.MANOKARA_BACKEND_ORIGIN || 'http://127.0.0.1:8000';

export default defineConfig({
  root: outputRoot,
  resolve: { preserveSymlinks: true },
  plugins: [react({ jsxRuntime: 'classic' }), {
    name: 'manokara-react-source-entry',
    transformIndexHtml(html) {
      return html.replace(
        '<script type="module" src="./manokara-react.js"></script>',
        '<script type="module" src="/src/manokara-react.jsx"></script>'
      );
    },
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        const requestUrl = request.url || '';
        const pathname = requestUrl.split('?')[0];
        if (pathname.startsWith('/src/')) {
          const relativePath = decodeURIComponent(pathname.slice('/src/'.length));
          const filePath = resolve(sourceRoot, relativePath);
          if (filePath !== sourceRoot && !filePath.startsWith(sourceRoot + sep)) return next();
          request.url = '/@fs/' + filePath.replaceAll('\\', '/') + requestUrl.slice(pathname.length);
        }
        next();
      });
    }
  }],
  server: {
    host: 'localhost',
    port: devPort,
    strictPort: true,
    fs: { allow: [projectRoot] },
    proxy: {
      '/__': {
        target: backendOrigin,
        changeOrigin: false
      }
    }
  },
  optimizeDeps: {
    entries: [resolve(sourceRoot, 'manokara-react.jsx')]
  }
});
