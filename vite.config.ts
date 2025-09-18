import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      server: {
        host: '0.0.0.0',
        port: 12000,
        cors: true,
        allowedHosts: ['work-1-rzvjmrpjifobzhky.prod-runtime.all-hands.dev', 'work-2-rzvjmrpjifobzhky.prod-runtime.all-hands.dev'],
        headers: {
          'X-Frame-Options': 'SAMEORIGIN',
          'X-Content-Type-Options': 'nosniff'
        }
      },
      build: {
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom', 'react-router-dom'],
              ui: ['axios', 'react-player', 'framer-motion']
            }
          }
        }
      },
      optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom', 'axios', 'react-player']
      }
    };
});
