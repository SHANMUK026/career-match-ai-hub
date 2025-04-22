
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0", // Listen on all addresses
    port: 8080,
    strictPort: false, // Allow fallback to another port if 8080 is taken
    hmr: {
      overlay: true, // Show errors as overlay
      clientPort: 8080 // Force client to use this port for HMR
    },
    watch: {
      usePolling: true, // Better file watching on some systems
    }
  },
  plugins: [
    react({
      plugins: [
        ['@swc/plugin-emotion', {}]
      ]
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'ui-vendor';
            }
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: mode === 'development',
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'framer-motion',
      '@radix-ui/react-toast',
      'lucide-react',
      'sonner'
    ],
    force: true
  },
  // Add better error reporting
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  // Make sure we're not getting stuck in infinite loops
  css: {
    devSourcemap: true,
  },
  // Clear the cache to ensure fresh builds
  cacheDir: '.vite_cache',
  clearScreen: false,
}));
